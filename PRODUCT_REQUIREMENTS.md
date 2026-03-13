# WishGift — Product Requirements Document

**Version:** 0.6.0
**Last Updated:** March 2026
**Status:** Active Development

---

## 1. Overview

WishGift is a collaborative gift list management platform that helps people organize, share, and coordinate gift-giving within groups. It solves the common problem of duplicate gift purchases by letting members of a group see what gifts others have already claimed, while keeping the actual purchaser anonymous to non-owners.

### Primary Use Cases
- Family holiday gift coordination
- Birthday planning among friends
- Wedding/baby registry alternatives
- Office Secret Santa events

---

## 2. User Roles & Access Control

### Unauthenticated Users
- Can view the landing page
- Must sign in to access any group or gift functionality

### Authenticated Users
All authenticated users are identified by their email address.

| Role | Description |
|------|-------------|
| **Group Owner** | User who created a group. Can edit and delete the group. Cannot mark their own gifts as purchased. |
| **Group Member** | Any user who has joined a group. Can add gifts, view all gifts, and mark others' gifts as purchased. |
| **Gift Owner** | User who added a specific gift. Can edit and delete it. Cannot mark it as purchased themselves. |

### Authorization Rules
- Only group members can view group details and gifts
- Only the group owner can edit or delete the group
- Only the gift owner can edit or delete a gift
- Only non-gift-owners can mark a gift as purchased
- All actions are attributed to the authenticated user's email

---

## 3. Authentication

**Provider:** Auth0 (via NextAuth.js v4)

- Users authenticate via Auth0 OAuth flow
- Sessions are managed via NextAuth.js cookies
- Unauthenticated requests to any API route return `401 Unauthorized`
- Separate Auth0 tenants for development and production environments

**Session Data Available:**
```
user.email   — primary user identifier
user.name    — display name
user.image   — optional profile picture URL
```

---

## 4. Features

### 4.1 Group Management

Groups are the top-level organizational unit. A group has a name, description, one owner, and a list of members.

#### Create a Group
- Any authenticated user can create a group
- Required: group name
- Optional: description
- Creator automatically becomes the owner and a member

#### Join a Group
- Users can join an existing group by entering its group ID
- Group ID is a UUID shown on the group detail page
- Joining adds the user's email to the group's members list

#### Edit a Group
- Only the group owner can edit
- Can update: name, description

#### Delete a Group
- Only the group owner can delete
- Cascading delete: removes all gifts associated with the group
- Requires confirmation before proceeding

#### View Groups
- Authenticated users see all groups they are a member of
- Displayed as a card grid with group name and description
- Clicking a group card navigates to the group detail page

---

### 4.2 Gift Management

Gifts belong to a group and represent items someone in the group wants to receive. Each gift has an owner (the person who added it) and an optional recipient name (which may differ from the owner).

#### Add a Gift
- Available to all group members
- Required: gift name
- Optional: description, price, URL (purchase link), recipient name, image
- Presented in a slide-in drawer UI

#### Edit a Gift
- Only the gift owner can edit
- All fields editable inline: name, description, price, URL, recipient name, image

#### Delete a Gift
- Only the gift owner can delete
- Requires confirmation before proceeding

#### View Gifts
- Gifts displayed in a responsive grid (1 column on mobile, up to 4 columns on desktop)
- Each gift card shows: image (if available), name, recipient, price, description, purchase link, and purchase status
- Hover over a card to reveal edit/delete controls (for gift owners)

---

### 4.3 Purchase Coordination

The core coordination feature — prevents duplicate gift purchases by letting members claim gifts.

#### Mark as Purchased
- Any group member who is **not** the gift owner can mark a gift as purchased
- Records the purchaser's email address alongside the gift
- The gift card displays a visual indicator (green overlay) when purchased
- Shows the purchaser's name to other members

#### Unmark as Purchased
- The same user who marked a gift as purchased can unmark it
- Returns the gift to its unpurchased state

#### Self-Purchase Prevention
- Gift owners cannot see or interact with the purchase toggle for their own gifts
- This prevents owners from seeing who purchased their own gift

---

### 4.4 Gift Search & Filtering

**Feature flag:** `NEXT_PUBLIC_IS_GIFT_FILTERING_ENABLED`

A collapsible search bar on the group detail page that filters the visible gifts in real time.

#### General Search
Searches across gift name, description, and recipient name simultaneously.

```
christmas sweater   → finds any gift matching "christmas sweater"
```

#### Field-Specific Search (Prefixed Syntax)
```
for:<name>          → filter by recipient name
name:<text>         → filter by gift name
price:<amount>      → filter by price
description:<text>  → filter by description
url:<text>          → filter by URL
```

#### Behavior
- Filtering is real-time (no submit required)
- Displays a live count: "Showing X of Y gifts"
- Search query is persisted in the URL as `?s=<query>`
- All matching is case-insensitive

---

### 4.5 Gift Images

**Feature flag:** `NEXT_PUBLIC_IS_GIFT_IMAGE_ENABLED`

Gifts can have an associated image that appears prominently on the gift card.

#### Manual Image URL
Users can provide a direct image URL when adding or editing a gift.

#### Image Scraping from Product URL
1. User pastes a product URL (e.g., from Amazon, Etsy, etc.)
2. App calls a Google Cloud Functions endpoint which extracts up to 12 relevant product images from the page
3. Results are displayed in a selection grid
4. User selects the desired image; it is saved to the gift record

---

## 5. Pages & Routes

### Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero image and sign-in prompt |
| `/groups` | Lists all groups the authenticated user belongs to; controls to create or join a group |
| `/groups/[groupId]` | Group detail page — shows all gifts in the group, search bar, and group management controls |
| `/about` | Placeholder about page |
| `/404` | Custom 404 error page |

### API Routes

All API routes require an authenticated session.

#### Groups

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/api/groups` | List all groups the user is a member of | Authenticated |
| PUT | `/api/groups/create` | Create a new group | Authenticated |
| GET | `/api/groups/[groupId]` | Get group details | Member only |
| PUT | `/api/groups/edit` | Update group name/description | Owner only |
| DELETE | `/api/groups/delete` | Delete group and all gifts | Owner only |
| PUT | `/api/groups/join` | Add current user as a member | Authenticated |

#### Gifts

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/api/gifts/[groupId]` | Fetch all gifts in a group | Member only |
| PUT | `/api/gifts/create` | Add a new gift to a group | Member only |
| PUT | `/api/gifts/edit` | Update gift details | Gift owner only |
| DELETE | `/api/gifts/delete` | Delete a gift | Gift owner only |
| PUT | `/api/gifts/purchase` | Toggle purchased state | Member, non-gift-owner |

#### Images

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| GET | `/api/images/find?url=<url>` | Scrape images from a product URL | Authenticated |

---

## 6. Data Model

**Database:** Supabase (PostgreSQL)

Table names are environment-aware: production uses plain names (`groups`, `gifts`); development prefixes with `dev_` (`dev_groups`, `dev_gifts`).

### Groups Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `name` | string | Required |
| `description` | string | Optional |
| `owner` | string | Email of creator |
| `members` | string[] | Array of member emails (includes owner) |
| `created_at` | timestamp | Auto-set on creation |

### Gifts Table

| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID | Primary key |
| `name` | string | Required |
| `description` | string | Optional |
| `url` | string | Purchase link, optional |
| `price` | string | Optional, stored as string |
| `image_url` | string | Optional |
| `is_purchased` | boolean | Default false |
| `purchased_by` | string | Email of purchaser, nullable |
| `gift_for_name` | string | Recipient display name |
| `owner` | string | Email of user who added the gift |
| `group_id` | UUID | Foreign key → groups.id |
| `created_at` | timestamp | Auto-set on creation |

### Users
Users are not stored in the application database. Identity is managed entirely by Auth0. The user's email address serves as the primary identifier across all application data.

---

## 7. Third-Party Integrations

| Service | Purpose | Configuration |
|---------|---------|---------------|
| **Auth0** | User authentication (OAuth) | `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_ISSUER` |
| **Supabase** | PostgreSQL database | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Google Cloud Functions** | Image scraping from product URLs | `GIFT_IMAGES_ENDPOINT`, `GIFT_IMAGES_NUM_RETURNED` |
| **Vercel Analytics** | Client-side usage analytics | Auto-configured via Vercel deployment |

---

## 8. Feature Flags

Feature flags are controlled via environment variables and evaluated at runtime on the client.

| Flag | Description |
|------|-------------|
| `NEXT_PUBLIC_IS_GIFT_IMAGE_ENABLED` | Enables gift image upload and URL scraping |
| `NEXT_PUBLIC_IS_GIFT_FILTERING_ENABLED` | Enables the search/filter bar on group pages |
| `NEXT_PUBLIC_IS_GIFT_CONTROLS_V2_ENABLED` | Toggles the v2 gift controls UI |

---

## 9. Technology Stack

### Frontend
- **Framework:** Next.js (Pages Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Primitives:** Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Server State:** TanStack React Query v5
- **Dark Mode:** next-themes

### Backend
- **Runtime:** Node.js 22.x
- **API Layer:** Next.js API Routes
- **Auth:** NextAuth.js v4 + Auth0
- **Database Client:** @supabase/supabase-js

### Tooling
- **Testing:** Vitest + React Testing Library
- **Linting:** Oxlint
- **Formatting:** Prettier
- **Analytics:** Vercel Analytics

---

## 10. Non-Functional Requirements

- **Responsive design:** Supports mobile through large desktop viewports
- **Dark mode:** Full dark/light theme toggle available in navigation
- **Accessibility:** Uses Radix UI primitives (ARIA-compliant), accessible text utilities for screen readers
- **Security:** All mutations validated server-side against session; no client-side trust for ownership checks
- **Environment isolation:** Dev and production use separate databases and Auth0 tenants

---

## 11. Out of Scope (Current Version)

The following are **not** implemented in the current version:

- Email notifications (no transactional email)
- Payment processing (no in-app purchasing)
- AI-powered gift recommendations
- Public wishlists (all lists require group membership)
- Native mobile app
- Real-time updates / WebSockets (page refresh required to see others' changes)
- Gift reservations without full purchase commitment
- Comments or reactions on gifts
