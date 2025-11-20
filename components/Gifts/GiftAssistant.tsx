import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Button from "../Forms/Button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface GiftSuggestion {
  name: string;
  description: string;
  reason: string;
}

interface AssistantResponse {
  message: string;
  suggestions?: GiftSuggestion[];
}

interface GiftAssistantProps {
  groupId: string;
  groupName?: string;
}

interface Gift {
  name: string;
  description: string;
  giftFor: {
    name: string;
  };
  price?: string;
  url?: string;
}

interface GiftsData {
  gifts: Gift[];
}

const fetcher = (url: string): Promise<GiftsData> =>
  fetch(url).then((res) => res.json());

const GiftAssistant = ({ groupId, groupName }: GiftAssistantProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your gift assistant. I can help you discover great gift ideas! You can ask me things like:\n\n• What should I ask for for Christmas?\n• What are some gifts that [name] might like?\n• What would go well with [gift name]?",
    },
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch gifts for context
  const { data: giftsData } = useQuery<GiftsData>({
    queryKey: ["gifts", groupId],
    queryFn: () => fetcher(`/api/gifts/${groupId}`),
    enabled: isOpen && !!groupId,
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Prepare group context
      const groupContext = giftsData?.gifts
        ? {
            groupId,
            groupName: groupName || "Your Group",
            gifts: giftsData.gifts.map((gift) => ({
              name: gift.name,
              description: gift.description,
              giftFor: gift.giftFor.name,
              price: gift.price,
              url: gift.url,
            })),
          }
        : undefined;

      const response = await fetch("/api/gifts/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          messages: [...messages, userMessage],
          groupContext,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from assistant");
      }

      const data: AssistantResponse = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // TODO: Handle suggestions if provided
      if (data.suggestions && data.suggestions.length > 0) {
        // Could display these as actionable cards below the message
        console.log("Suggestions:", data.suggestions);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again or rephrase your question.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M12 7v6" />
            <path d="M9 10h6" />
          </svg>
          Gift Assistant
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl h-[80vh] flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Gift Assistant</DrawerTitle>
            <DrawerDescription>
              Ask me for gift ideas, suggestions, and recommendations!
            </DrawerDescription>
          </DrawerHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-3">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t px-4 py-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about gift ideas..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GiftAssistant;
