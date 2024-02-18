import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import AceEditor from "react-ace";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import Markdown from "react-markdown";
import { useUser } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/router";
export default function CodeAnalyzer() {
  const router = useRouter();
  const MODEL_NAME = "gemini-pro";
  const { user } = useUser();
  const [message, setMessage] = useState();
  const [userPrompt, setUserPrompt] = useState();
  const API_KEY = "AIzaSyA_KMefibpuuM56ibhTArtxYk-zMJWF2N4";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const [code, setCode] = useState(decodeURIComponent(router.query.code || ""));
  function onChange(newValue) {
    setCode(newValue);
  }
  console.log(code);
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

  const analyzeCode = async () => {
    const parts = [
      {
        text: "Analyse the code sample given. If there's an error describe the error and give the code to solve it. Keep the first line of the output about the error. Give the most severe error. Also tell me in short how can I improve the efficiency of my code. If there are any improvements then give me a code sample. Return the output in mdx form strictly",
      },
      { text: code },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    console.log(result);
    setMessage(result.response.text());
  };

  return (
    <div className="h-screen flex items-center justify-center gap-12 px-20">
      <div className="flex-1 flex items-center justify-center">
        <AceEditor
          mode="java"
          theme="github"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
      <Button onClick={analyzeCode} className="">
        Analyse
      </Button>
      <Card className="flex-1 ">
        <CardHeader>
          <ScrollArea className="h-[500px] w-[500px] text-wrap">
            <Markdown children={message} />
          </ScrollArea>
        </CardHeader>
      </Card>
    </div>
  );
}
