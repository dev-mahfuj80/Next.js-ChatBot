import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import { formattedSourceText } from "@/lib/utils";

const wrappedText = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line} <br />
    </span>
  ));

interface ChatBubbleProps extends Partial<Message> {
  sources: string[];
}

export function ChatBubble({
  role = "assistant",
  content,
  sources,
}: ChatBubbleProps) {
  if (!content) return null;

  const wrappedMessage = wrappedText(content);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>{wrappedMessage}</Balancer>
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem key={index} value={`source-${index}`}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown
                        components={{
                          a: (props) => (
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {formattedSourceText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              "No sources provided"
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
