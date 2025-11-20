# WishGift

A place for lists of gifts.

## Features

- **Gift Lists**: Create and manage gift lists within groups
- **Gift Assistant**: AI-powered assistant to help you discover gift ideas
  - Ask for gift suggestions for specific people
  - Find complementary gifts
  - Get personalized recommendations

## Gift Assistant

The Gift Assistant is available on all group pages and can help you with:

- Finding gift ideas for people in your group
- Suggesting complementary gifts to pair with existing items
- Getting personalized recommendations based on your group's gift history

### Using the Gift Assistant

1. Navigate to any group page
2. Click the "Gift Assistant" button in the top right
3. Ask questions like:
   - "What are some other gifts that Chris might be interested in?"
   - "What would be a good accompanying gift in addition to [gift name]?"
   - "What should I ask for for Christmas?"

### AI Integration (Optional)

The Gift Assistant currently uses placeholder responses. To integrate with a real AI API:

1. Add your AI API credentials to `.env`:
   ```
   GIFT_ASSISTANT_API_ENDPOINT=your_api_endpoint
   GIFT_ASSISTANT_API_KEY=your_api_key
   ```

2. Update the `generateAIResponse` function in `/pages/api/gifts/assistant/chat.ts` to call your AI API (OpenAI, Anthropic Claude, etc.)

## Setup

1. Copy `.env.example` to `.env` and fill in your configuration
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
