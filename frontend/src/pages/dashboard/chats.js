import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Home, PcCaseIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { CodeBlock, CopyBlock } from "react-code-blocks";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Dashboard from ".";
const navItems = [
  {
    name: "Home",
    link: "/dashboard",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Chats",
    link: "/chats",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Image To Code",
    link: "/dashboard/image-to-code",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Data visualisation",
    link: "/code-analyzer",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

const message1 = [
  {
    id: 1,
    sender: "User1",
    message: "Hello, how are you?",
    timestamp: new Date().getTime() - 1000000,
  },
  {
    id: 2,
    sender: "User2",
    message: "I'm good, thanks! How about you?",
    timestamp: new Date().getTime() - 5000,
  },
  {
    id: 3,
    sender: "User1",
    message: "I need a help with Tensorflow.",
    timestamp: new Date().getTime(),
    language: "javascript",
  },
  {
    id: 4,
    sender: "User2",
    message:
      "Of course! I'd be happy to help you with TensorFlow. What specific questions or issues do you have?",
    timestamp: new Date().getTime() - 1000000,
  },
];
const chatHistories = [
  {
    chatId: 1,
    title: "chat 1 ",
    messages: message1,
  },
  {
    chatId: 2,
    title: "Untitled",
    messages: message1,
  },
  {
    chatId: 3,
    title: "Untitled",
    messages: message1,
  },
  {
    chatId: 4,
    title: "Untitled",
    messages: message1,
  },
  // more chat histories...
];

function Chats() {
  const MODEL_NAME = "gemini-pro";
  const { user } = useUser();
  const [chatMessages, setChatMessages] = useState(message1);
  const [userPrompt, setUserPrompt] = useState();
  const API_KEY = "AIzaSyA_KMefibpuuM56ibhTArtxYk-zMJWF2N4";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const [lastId, setLastId] = useState();
  const generationConfig = {
    temperature: 0,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const getAnswer = async (userQuestion) => {
    const parts = [{ text: "" }, { text: userQuestion }];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    console.log(response.text());
    setChatMessages([
      ...chatMessages,
      {
        id: Math.random() + 1,
        sender: "User1",
        message: userQuestion,
        timestamp: new Date().getTime() - 1000000,
      },
      {
        id: Math.random() + 1,
        sender: "User2",
        message: response.text(),
        timestamp: new Date().getTime() - 1000000,
      },
    ]);
    console.log(chatMessages);

    setUserPrompt("");
  };

  return (
    <Dashboard>
      <div className="h-full mx-auto  flex py-10 px-5 gap-12 ">
        <Card className="min-h-auto bg-transparent w-80 border-none text-white flex flex-col justify-between">
          <div className="grid gap-4">
            {chatHistories.map((chat) => (
              <div className="flex text-lg border rounded-md border-gray-100/50 hover:cursor-pointer w-full items-center justify-between  p-4 ">
                {chat.title}
                <div className="flex items-center gap-2 ">
                  <Edit />
                  <Trash />
                </div>
              </div>
            ))}
          </div>
          <Button
            className="rounded-md text-[#1a202c] hover:text-white bg-white"
            size="lg"
          >
            New Chat
          </Button>
        </Card>
        <div className="flex-1 h-full flex flex-col gap-12">
          <Card className="flex-1 bg-transparent/25 dark:bg-[#18181B] text-white">
            <CardHeader>
              <CardTitle>Title</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[700px] ">
              <CardContent className="grid gap-10 text-lg">
                {chatMessages.map((message) => {
                  const isCode = message.message.includes("```");
                  let text = message.message;
                  let code = "";

                  if (isCode) {
                    [text, code] = message.message.split("```");
                    code = code
                      .replace(`${message.language}\n`, "")
                      .slice(0, -1); // remove the language specification and the last newline character
                  }
                  return (
                    <div
                      key={message.id}
                      className="flex items-start justify-start gap-8"
                    >
                      {message.sender === "User1" ? (
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
                              <CodeBlock
                                language={message.language}
                                text={code}
                                //   language={props.language}
                                showLineNumbers={true}
                              />
                              <Link
                                href={`/code-analyzer?code=${encodeURIComponent(
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
            <Textarea
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
        </div>
      </div>
    </Dashboard>
  );
}

export default Chats;
