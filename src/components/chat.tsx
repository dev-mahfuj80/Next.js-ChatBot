import { ChatBubble } from "./chat-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "ai/react";
export function Chat() {
  const messages: Message[] = [
    {
      role: "assistant",
      content: "Hello, how can I help you today?",
      id: "1",
    },
    {
      role: "user",
      content: "Hello, how can I help you today?",
      id: "2",
    },
  ];

  const sources = ["I am Source 1", "I am Source 2"];
  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto">
        {messages.map(({ id, role, content }: Message) => (
          <ChatBubble
            key={id}
            role={role}
            content={content}
            sources={role !== "assistant" ? [] : sources}
          />
        ))}
      </div>

      <form className="p-4 flex clear-both">
        <Input placeholder={"Type to chat with AI..."} className="mr-2" />
        <Button type="submit" className="w-24">
          Ask
        </Button>
      </form>
    </div>
  );
}
