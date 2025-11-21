# WishGift Product Overview

## Executive Summary

WishGift is a collaborative gift list management platform that helps people organize and coordinate gift-giving. Users can create wishlists, share them with groups of friends and family, and coordinate purchases to prevent duplicate gift buying.

---

## Product Mission

The core mission of WishGift is to simplify group gift coordination by:
- Enabling users to create and share personal wishlists of desired gifts
- Organizing gifts into shareable groups
- Allowing friends and family to see what gifts others want
- Coordinating purchases to prevent duplicate gift buying through purchase status tracking

---

## Key Features

### 1. Group Management

**Create Groups**
- Users can create new gift-sharing groups with a name and description
- Group creators automatically become the group owner

**Join Groups**
- Users can join existing groups using a group ID
- Group membership is required to view and interact with group gifts

**Edit Groups**
- Group owners can modify group names and descriptions
- Edit functionality is restricted to the group owner

**Delete Groups**
- Group owners can permanently delete groups they created
- Deletion removes the group and all associated data

**Group Membership**
- Each group has multiple members (users) and a single owner
- Members can view all gifts within their groups

---

### 2. Gift List Management

**Add Gifts**

Users can add gifts to groups with the following information:
- **Gift Name** (required)
- **Description** (optional)
- **Price** (optional)
- **URL/Link** (optional) - Link to where the gift can be purchased
- **Gift For** - Name of the intended recipient (defaults to gift creator's name)
- **Image** (optional) - Visual representation of the gift

**Edit Gifts**
- Gift owners can update any gift details after creation
- Edit mode provides inline form for quick updates

**Delete Gifts**
- Gift owners can remove gifts from their lists
- Confirmation dialog prevents accidental deletions

**Add Images**
- Users can attach images to their gifts
- Integration with external image scraping service to find images from URLs
- Support for uploading custom images
- 12 image options returned from scraping service

**View Gifts**
- Grid layout displaying all gifts in a group (2-4 columns, responsive)
- Card-based interface showing:
  - Gift image (if available)
  - Gift name and description
  - Price information
  - Link to purchase URL
  - Recipient name
  - Purchase status and purchaser name

---

### 3. Purchase Coordination

**Mark as Purchased**
- Group members (except the gift owner) can mark gifts as purchased
- Purchaser's name is automatically recorded with the gift
- Prevents coordination issues and duplicate purchases

**Visual Purchase Status**
- Purchased gifts display with a distinctive ribbon/badge overlay
- Shows who purchased the gift
- Clear visual differentiation between available and purchased gifts

**Prevent Self-Purchase**
- Gift owners cannot mark their own gifts as purchased
- Ensures authentic gift coordination

---

### 4. Search & Filtering

**Gift Search**

Multiple search modes available:
- **General Search**: Searches across gift name, description, and recipient fields
- **Field-Specific Search**: Targeted searching using prefixes:
  - `for:John` - Search by recipient
  - `name:book` - Search by gift name
  - `price:50` - Search by price

**Filter Display**
- Toggle between showing all gifts or filtered results
- Maintains context of total available gifts

**Gift Counter**
- Real-time display showing: "Showing X of Y gifts"
- Updates dynamically based on search filters

---

### 5. Image Management

**Gift Images**
- Upload and attach images to individual gifts
- Visual representation enhances gift clarity

**Image Scraping**
- Integration with Google Cloud Functions-based scraping service
- Automatically finds relevant images from provided URLs
- Returns 12 image options for user selection

**Image Display**
- Prominent image display on gift cards
- Responsive image sizing for different screen sizes

---

## User Flows

### Authentication Flow

1. User visits the application
2. Landing page displays for unauthenticated users
3. User clicks sign-in
4. Auth0 handles authentication
5. User redirected to groups page upon successful authentication

### Creating and Sharing a Gift List

1. User navigates to Groups page (`/groups`)
2. Clicks "Create New Group"
3. Fills out group name and description
4. Group is created and user becomes owner
5. User shares group ID with friends/family
6. Friends join the group using the group ID
7. All members can now add gifts to the shared list

### Adding a Gift

1. User enters a group detail page (`/groups/[groupId]`)
2. Clicks "Add Gift" button
3. Drawer modal opens with gift form
4. User fills in:
   - Gift name
   - Description
   - Price (optional)
   - URL (optional)
   - Gift recipient name
5. Optionally adds an image via:
   - Direct upload, or
   - URL scraping (pastes URL, service finds images)
6. Submits the form
7. Gift appears in the group's gift grid

### Coordinating Gift Purchases

1. Group member views gifts in a shared group
2. Browses available (unpurchased) gifts
3. Decides to purchase a gift for another member
4. Checks the "Mark as Purchased" checkbox
5. Gift updates immediately with:
   - Visual ribbon overlay indicating "purchased"
   - Purchaser's name displayed
6. Other members see the gift is no longer available
7. Prevents duplicate gift purchases

### Searching for Gifts

1. User enters a group with many gifts
2. Uses the search bar at the top of the gift list
3. Types search query:
   - Simple text: "book" (searches all fields)
   - Targeted: "for:Sarah" (finds gifts for Sarah)
4. Gift grid filters in real-time
5. Counter shows "Showing 3 of 25 gifts"
6. User can clear search to see all gifts again

---

## Core Data Models

### Groups

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| name | string | Group name |
| description | string | Group description |
| owner | string | Email of group creator |
| members | array | List of member emails |
| created_at | timestamp | Creation timestamp |

### Gifts

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique identifier |
| name | string | Gift name |
| description | string | Gift description |
| url | string | Purchase link (optional) |
| price | string | Price (optional) |
| image_url | string | Image URL (optional) |
| is_purchased | boolean | Purchase status |
| purchased_by | string | Purchaser email (optional) |
| gift_for_name | string | Recipient name |
| owner | string | Gift creator email |
| group_id | UUID | Parent group reference |
| created_at | timestamp | Creation timestamp |

### Users

Users are managed through Auth0 and NextAuth.js:
- Email address (unique identifier)
- Name
- Profile image (optional)
- Session metadata

---

## Technology Stack

### Frontend
- **Framework**: Next.js (latest) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives (dialog, checkbox, navigation, etc.)
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **State Management**: TanStack React Query v5

### Backend
- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js v4 with Auth0 provider
- **External Services**: Google Cloud Functions (image scraping)

### Development
- **Testing**: Vitest with React Testing Library
- **Linting**: Oxlint
- **Package Manager**: npm
- **Node Version**: 22.x

---

## Security & Authorization

### Authentication
- All features require authentication via Auth0
- Session management handled by NextAuth.js
- Secure token-based authentication

### Authorization Rules

**Group Access**
- Only group members can view group details and gifts
- Group owners have additional edit/delete permissions

**Gift Permissions**
- Only gift owners can edit or delete their gifts
- Group members can view all gifts in their groups
- Only non-owners can mark gifts as purchased

**Data Privacy**
- Users can only access groups they're members of
- Email-based user identification ensures proper attribution

---

## Feature Flags

The application supports environment-based feature toggles:

| Flag | Description |
|------|-------------|
| `NEXT_PUBLIC_IS_GIFT_IMAGE_ENABLED` | Enable/disable gift image functionality |
| `NEXT_PUBLIC_IS_GIFT_CONTROLS_V2_ENABLED` | Toggle new gift controls UI version |
| `NEXT_PUBLIC_IS_GIFT_FILTERING_ENABLED` | Enable/disable search and filter functionality |

---

## Environment Support

### Development Environment
- Database tables prefixed with `dev_`
- Separate development Auth0 configuration
- Hot module reloading for rapid development

### Production Environment
- Production database tables (no prefix)
- Production Auth0 tenant
- Optimized build with performance monitoring

---

## Current Version

**Version**: 0.6.0 (Active Development)

### Recent Updates
- Migration from SWR to TanStack React Query for improved data fetching
- Changed gift creation to use drawer modal for better UX
- Multiple test suite improvements and fixes
- Enhanced type safety across the application

---

## User Experience Highlights

### Mobile-Responsive Design
- Fully responsive layout adapting to all screen sizes
- Touch-optimized interactions for mobile devices
- Adaptive grid layouts (2 columns on mobile, 4 on desktop)

### Modern UI/UX
- Clean, card-based interface
- Smooth animations and transitions
- Intuitive navigation and controls
- Visual feedback for all interactions

### Performance
- Optimized data fetching with React Query
- Efficient re-rendering with React 18
- Fast page loads with Next.js optimizations
- Cached queries for improved responsiveness

---

## Use Cases

### Family Gift Coordination
A family creates a group for holiday gifts. Each family member adds their wishlist, and others can claim gifts to purchase, preventing duplicates.

### Birthday Planning
Friends create a group for an upcoming birthday. The birthday person adds desired gifts, and friends coordinate purchases without spoiling the surprise.

### Wedding Registry Alternative
A couple creates a gift group for their wedding, sharing it with guests who can see and claim gifts to purchase.

### Office Secret Santa
Coworkers create a group for Secret Santa. Each person adds a few gift ideas, and participants can browse and mark purchases.

---

## Future Considerations

Based on the current architecture and feature flags, potential areas for future development include:
- Enhanced image management capabilities
- Advanced gift filtering and sorting options
- Gift price tracking and budgeting features
- Notification system for gift purchases
- Gift recommendation engine
- Social sharing capabilities
- Multi-group gift management dashboard

---

## Support & Development

**Current Branch**: feature/gift-input (active development)
**Repository**: Git-based version control
**Testing**: Automated test suite with Vitest
**Development Node**: v22.x required

---

*Document generated: 2025-11-17*
*Application Version: 0.6.0*
