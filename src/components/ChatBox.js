import { useUser } from "@clerk/nextjs";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { CodeBlock } from "react-code-blocks";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { model, generationConfig, safetySettings } from "@/lib/ai";
export default function ChatBox({ chatId }) {
  const { user } = useUser();
  const createMessage = useMutation(api.chat.createMessage);
  const messages = useQuery(api.chat.getMessages, {
    user: user.id,
    chatId: chatId,
  });
  const chat = useQuery(api.chat.getChatFromId, { chatId: chatId });
  console.log(messages);
  const [userPrompt, setUserPrompt] = useState();

  const getAnswer = async (userQuestion) => {
    const parts = [{ text: "" }, { text: userQuestion }];
    createMessage({
      body: userQuestion,
      user: user.id,
      isAi: false,
      chatId: chatId,
    });
    setUserPrompt("");

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    console.log(response.text());

    createMessage({
      body: response.text(),
      user: user.id,
      isAi: true,
      chatId: chatId,
    });
  };
  //   console.log(messages);
  return (
    <>
      <Card className="flex-1  bg-transparent/25 dark:bg-[#18181B] text-white">
        <CardHeader>
          <CardTitle>{chat?.title}</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[600px] ">
          <CardContent className="grid gap-10 text-lg">
            {messages?.map((message) => {
              const isCode = message.body.includes("```");
              let text = message.body;
              let code = "";

              if (isCode) {
                [text, code] = message.body.split("```");
                code = code.replace(/^[^\n]*\n/, ""); // remove the first line
              }
              return (
                <div
                  key={message._id}
                  className="flex items-start justify-start gap-8"
                >
                  {!message.isAi ? (
                    <img
                      src={user.imageUrl}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <img
                      src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-260nw-2261401207.jpg"
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="flex justify-between items-start flex-1">
                    <div className="flex flex-col gap-3">
                      <p>{text}</p>
                      {isCode && (
                        <div>
                          <CodeBlock text={code} showLineNumbers={true} />
                          <Link
                            href={`/dashboard/code-analyzer?code=${encodeURIComponent(
                              code
                            )}`}
                          >
                            <Button className="mt-4 ">
                              Check your code here
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </ScrollArea>
      </Card>
      <div className="flex items-center gap-12">
        <Input
          className="resize-none h-[60px] text-xl p-3 w-full bg-transparent text-white"
          value={userPrompt}
          onChange={(e) => {
            setUserPrompt(e.target.value);
          }}
        />
        <Button
          size="lg"
          className="h-full rounded-md bg-white text-[#1a202c] hover:text-white"
          onClick={() => getAnswer(userPrompt)}
        >
          Generate
        </Button>
      </div>
    </>
  );
}
