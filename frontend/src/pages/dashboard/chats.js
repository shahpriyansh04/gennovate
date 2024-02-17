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
    message:
      "Here's a code snippet: \n\n```javascript\nlet x = 10;\nconsole.log(x);\n```",
    timestamp: new Date().getTime(),
    language: "javascript",
  },
  {
    id: 4,
    sender: "User1",
    message: "Hello, how are you?",
    timestamp: new Date().getTime() - 1000000,
  },
  {
    id: 5,
    sender: "User2",
    message: "I'm good, thanks! How about you?",
    timestamp: new Date().getTime() - 5000,
  },
  {
    id: 6,
    sender: "User1",
    message:
      "Great! Here's some C# code: \n\n```csharp\nint x = 10;\nConsole.WriteLine(x);\n```",
    timestamp: new Date().getTime(),
    language: "csharp",
  },
  {
    id: 7,
    sender: "User1",
    message: "Hello, how are you?",
    timestamp: new Date().getTime() - 1000000,
  },
  {
    id: 8,
    sender: "User2",
    message: "I'm good, thanks! How about you?",
    timestamp: new Date().getTime() - 5000,
  },
  {
    id: 9,
    sender: "User1",
    message:
      "Here's yet another code snippet: \n\n```javascript\nlet arr = [1, 2, 3, 4, 5];\nlet sum = arr.reduce((a, b) => a + b, 0);\nconsole.log(sum);\n```",
    timestamp: new Date().getTime(),
    language: "javascript",
  },
  {
    id: 10,
    sender: "User1",
    message: "Hello, how are you?",
  },
];
const chatHistories = [
  {
    chatId: 1,
    title: "Chat with User2",
    messages: message1,
  },
  {
    chatId: 2,
    title: "Chat with User4",
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

  const handleGenerate = () => {
    setChatMessages([
      ...chatMessages,
      {
        id: Math.random(),
        sender: "User1",
        message: userPrompt,
        timestamp: new Date().getTime() - 1000000,
      },
    ]);

    getAnswer(userPrompt);
  };

  return (
    <div className="h-screen flex-col flex items-start">
      <Navbar navItems={navItems} />
      <div className="w-3/5 mx-auto mt-20 flex h-full gap-12 py-12">
        <Card className="min-h-auto  w-80 flex flex-col justify-between">
          <div>
            {chatHistories.map((chat) => (
              <div className="flex text-lg hover:cursor-pointer w-full items-center justify-between border-y-2 border-gray-200  p-4 ">
                {chat.title}
                <div className="flex items-center gap-2 ">
                  <Edit />
                  <Trash />
                </div>
              </div>
            ))}
          </div>
          <Button>New Chat</Button>
        </Card>
        <div className="flex-1 h-full flex flex-col gap-12">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Title</CardTitle>
            </CardHeader>
            <ScrollArea className="h-[500px] ">
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
                      <img
                        src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-260nw-2261401207.jpg"
                        alt="User Avatar"
                        className="w-8 h-8"
                      />

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
                                <Button>Check your code here</Button>
                              </Link>
                            </div>
                          )}
                        </div>

                        <p>
                          {`${new Date(
                            message.timestamp
                          ).getHours()}:${new Date(
                            message.timestamp
                          ).getMinutes()} `}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </ScrollArea>
          </Card>
          <div className="flex items-center gap-12">
            <Textarea
              className="resize-none h-[60px] text-xl p-3 w-full"
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
            />
            <Button
              size="lg"
              className="h-full rounded-md"
              onClick={() => getAnswer(userPrompt)}
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
