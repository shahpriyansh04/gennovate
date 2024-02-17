import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import gfm from "remark-gfm";
import { MDXProvider } from "@mdx-js/react";

import remarkGfm from "remark-gfm";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { CodeBlock } from "react-code-blocks";
import Navbar from "@/components/ui/navbar";
import Home from "..";
import { Button } from "@/components/ui/button";

const MODEL_NAME = "gemini-1.0-pro-vision-latest";
const API_KEY = "AIzaSyA_KMefibpuuM56ibhTArtxYk-zMJWF2N4";
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
    name: "Error",
    link: "/error-detection",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
const MyComponent = () => {
  const components = {
    code: CodeBlock,
    // Add other components you want to use in your MDX content here
  };
  const [file, setFile] = useState(null);
  const [code, setCode] = useState();
  const [text, setText] = useState();
  const [filePath, setFilePath] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result.split(",")[1]); // remove the data:image/jpeg;base64, part
    };
    const url = URL.createObjectURL(file);
    setFilePath(url);
    reader.readAsDataURL(file);
  };

  const generateContent = async () => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096,
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

    const parts = [
      {
        text: "Provide a html and a css for the given image\n\nCSS should be inline CSS and not outside the HTML",
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: file,
        },
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    let text = response.text();
    text = text.replace(/```/g, "");

    text = text.replace(`html\n`, "").slice(0, -1);
    setCode(text);
    setText(result.response.text());
    console.log(text);
  };

  return (
    <div className="h-screen flex-col flex items-center">
      <Navbar navItems={navItems} />
      {filePath && <img src={filePath} alt="Selected" />}
      {!text && !file && <input type="file" onChange={handleFileChange} />}
      {!text && file && (
        <Button onClick={generateContent} className="mt-6" size="xl">
          Generate Content
        </Button>
      )}
      <div className="py-12">
        <Markdown children={text} />
      </div>
    </div>
  );
};

export default MyComponent;
