import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: Message[];
  groupContext?: {
    groupId: string;
    groupName: string;
    gifts: Array<{
      name: string;
      description: string;
      giftFor: string;
      price?: string;
      url?: string;
    }>;
  };
}

interface ChatResponse {
  message: string;
  suggestions?: Array<{
    name: string;
    description: string;
    reason: string;
  }>;
}

interface ErrorResponse {
  error: string;
}

// Placeholder function for AI integration
// Replace this with actual AI API calls (OpenAI, Anthropic, etc.)
async function generateAIResponse(
  messages: Message[],
  groupContext?: ChatRequest["groupContext"],
): Promise<ChatResponse> {
  // TODO: Integrate with actual AI API
  // Example: OpenAI, Anthropic Claude, etc.

  const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || "";

  // Simple placeholder logic - replace with actual AI
  let response = "";
  const suggestions = [];

  if (lastMessage.includes("what should i ask for")) {
    response = "Based on your group's gift history, here are some personalized suggestions for you. Consider what you've been interested in lately or what would complement your hobbies!";
    suggestions.push(
      {
        name: "Example Gift 1",
        description: "A thoughtful gift idea based on your interests",
        reason: "This would complement the other items in your list",
      },
      {
        name: "Example Gift 2",
        description: "Another great option for you",
        reason: "This is popular among people with similar interests",
      },
    );
  } else if (lastMessage.includes("accompanying gift") || lastMessage.includes("goes well with")) {
    response = "Here are some complementary gift ideas that would pair nicely with that item:";
    suggestions.push(
      {
        name: "Complementary Item",
        description: "This pairs perfectly with your chosen gift",
        reason: "Often purchased together",
      },
    );
  } else if (groupContext?.gifts.length) {
    // Check if asking about a specific person
    const giftForNames = groupContext.gifts.map((g) => g.giftFor.toLowerCase());
    const mentionedPerson = giftForNames.find((name) => lastMessage.includes(name));

    if (mentionedPerson) {
      const personGifts = groupContext.gifts.filter(
        (g) => g.giftFor.toLowerCase() === mentionedPerson,
      );
      response = `Based on the gifts already listed for ${mentionedPerson}, here are some similar ideas they might enjoy:`;
      suggestions.push({
        name: "Similar Gift Idea",
        description: "A gift in the same category as their other interests",
        reason: `Complements their interest in ${personGifts[0]?.name || "their hobbies"}`,
      });
    } else {
      response = "I can help you find the perfect gift! Tell me more about the person or what you're looking for.";
    }
  } else {
    response = "I'm here to help you discover great gift ideas! You can ask me things like:\n\n• What should I ask for for Christmas?\n• What are some gifts that [name] might like?\n• What would go well with [gift name]?";
  }

  return {
    message: response,
    suggestions: suggestions.length > 0 ? suggestions : undefined,
  };
}

export default async function assistantChat(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | ErrorResponse>,
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, groupContext } = req.body as ChatRequest;

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required" });
    }

    // Generate AI response
    const aiResponse = await generateAIResponse(messages, groupContext);

    return res.status(200).json(aiResponse);
  } catch (error) {
    console.error("Error in assistant chat:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
