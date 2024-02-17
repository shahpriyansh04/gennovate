import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Home, PcCaseIcon, Trash } from "lucide-react";
import React, { useState } from "react";
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { JsonInput } from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
const navItems = [
  {
    name: "Home",
    link: "/dashboard",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Chats",
    link: "/dashboard/chats",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Image To Code",
    link: "/dashboard/image-to-code",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Data visualisation",
    link: "/dashboard/data",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

function Code() {
  const MODEL_NAME = "gemini-pro";
  const [chatMessages, setChatMessages] = useState([]);

  const API_KEY = "AIzaSyA_KMefibpuuM56ibhTArtxYk-zMJWF2N4";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [schema, setSchema] = useState();

  const [userPrompt, setUserPrompt] = useState();

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
  console.log(chatMessages);
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Write a custom javascript function that satisfies the given provided prompt. Provide just the code and nothing else for the explanation.I dont want the input token in the output. Send just the code block without any formatting as plain text.I also don't like to read, please keep your answers short and SFW. Peace.",
          },
          {
            text: `{THe function should have inputs following the given JSON :  ${input}}`,
          },
          {
            text: `{THe function should have output following the given JSON :  ${output}}`,
          },
          {
            text: `{THe function should consider the following database schema :  ${schema}}`,
          },
          {
            text: `{Give a code that satifies the following condition :  ${userPrompt}}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Yes. I will answer as per your requirement.",
          },
        ],
      },
    ],
  });
  const getAnswer = (newMessages = ["Just return a hello world function"]) => {
    const userQuestion = newMessages;

    chat
      .sendMessage(userQuestion)
      .then((result) => {
        let text = result.response.candidates[0].content.parts[0].text;
        text = text.replace(/```/g, "");

        text = text.replace(`javascript\n`, "").slice(0, -1);

        setChatMessages(text);
      })
      .catch((error) => {
        console.error("Error in getAnswer function:", error);
      });
  };

  const code = `function HelloWorld() {
      console.log("Hello, world!");
    }
    HelloWorld();`;
  return (
    <div className="h-screen flex-col flex items-center">
      <Navbar navItems={navItems} />
      <div className="w-3/5 flex flex-col justify-center gap-12">
        <div className="flex space-x-12 mt-12 justify-between ">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Input JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <JSONInput
                placeholder={{ hello: "world" }} // pass a valid JSON object here
                height="200px"
                style={{ body: { fontSize: "20px" } }} // increase the font size here
                onChange={({ jsObject }) => {
                  if (jsObject) setInput(jsObject);
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Output JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <JSONInput
                placeholder={{ hello: "world" }} // pass a valid JSON object here
                height="200px"
                style={{ body: { fontSize: "20px" } }}
                onChange={({ jsObject }) => {
                  if (jsObject) setOutput(jsObject);
                }}
                // increase the font size here
              />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-1 w-full gap-16">
          <Textarea
            className="resize-none border-2 text-xl h-40"
            placeholder="Enter your schema here"
            value={schema}
            onChange={(e) => setSchema(e.target.value)}
          />
          <Textarea
            className="resize-none border-2 text-xl h-40"
            placeholder="Enter your prompt here"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </div>
        <Button
          className="rounded-md w-min mx-auto"
          size="lg"
          onClick={() => {
            getAnswer(userPrompt);
          }}
        >
          Generate
        </Button>
        <div className="py-12 text-xl">
          <CodeBlock
            text={chatMessages.length !== 0 ? chatMessages : code}
            language="javascript"
            showLineNumbers
            style={{ fontSize: "200px" }} // increase the font size here
          />
        </div>
      </div>
    </div>
  );
}

export default Code;
