import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Home } from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "react-code-blocks";
import JSONInput from "react-json-editor-ajrm";
import { model, generationConfig, safetySettings } from "@/lib/ai";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { MagnifyingGlass } from "react-loader-spinner";
import Dashboard from ".";
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
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();
  const [output, setOutput] = useState();
  const [schema, setSchema] = useState();

  const [userPrompt, setUserPrompt] = useState();

  console.log(chatMessages);
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Write a custom javascript function that satisfies the given provided prompt. Provide just the code and nothing else for the explanation.I dont want the input token in the output. Send just the code block without any formatting as plain text.I also don't like to read, please keep your answers short and SFW. Peace. Provide a complete function that includes the return type, scope identifier, modifier,etc. It should check for errors as well",
          },
          {
            text: `THe function should have inputs following the given JSON :  ${input}`,
          },
          {
            text: `THe function should have output following the given JSON :  ${output}`,
          },
          {
            text: `THe function should consider the following database schemas :  ${schema}`,
          },
          {
            text: `Give a code that satifies the following condition :  ${userPrompt}`,
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
    setLoading(true);
    const userQuestion = newMessages;

    chat
      .sendMessage(userQuestion)
      .then((result) => {
        let text = result.response.candidates[0].content.parts[0].text;
        text = text.replace(/```/g, "");

        text = text.replace(`javascript\n`, "").slice(0, -1);

        setChatMessages(text);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error in getAnswer function:", error);
      });
  };

  const code = `function HelloWorld() {
      console.log("Hello, world!");
    }
    HelloWorld();`;

  console.log(input);
  return (
    <Dashboard>
      <div className="w-3/5 mx-auto flex flex-col justify-center gap-12">
        <div className="container grid items-start gap-4">
          <div className="space-y-2 flex flex-col items-center">
            <h1 className="text-3xl font-bold tracking-tighter md:text-5xl/relaxed text-white dark:text-gray-50">
              Function Generator
            </h1>
            <p className="max-w-[700px] text-center text-muted-foreground md:text-xl/relaxed dark:text-gray-400">
              Generate functions based on your shcmema using the power of AI
            </p>
          </div>
          <div className="flex flex-col gap-6 mt-12">
            <div className="flex gap-20">
              <div className="flex-1">
                <p className="text-center text-white text-xl mb-3">
                  Input JSON
                </p>

                <JSONInput
                  placeholder={{ hello: "world" }} // pass a valid JSON object here
                  height="400px"
                  width="100%"
                  style={{ body: { fontSize: "20px" } }}
                  onChange={({ jsObject }) => {
                    if (jsObject) setInput(jsObject);
                  }}
                  // increase the font size here
                />
              </div>
              <div className="flex-1">
                <p className="text-center text-white text-xl mb-3">
                  Output JSON
                </p>
                <JSONInput
                  placeholder={{ hello: "world" }} // pass a valid JSON object here
                  height="400px"
                  width="100%"
                  style={{ body: { fontSize: "20px" } }}
                  onChange={({ jsObject }) => {
                    if (jsObject) setOutput(jsObject);
                  }}
                  // increase the font size here
                />
              </div>
            </div>

            <div className="flex w-full gap-20">
              <Textarea
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                placeholder="Enter your schema here "
                className="min-h-28 text-xl"
              />
              <Textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Enter your prompt here"
                className="min-h-28 text-xl"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center mt-12">
            <Button
              className="rounded-md  py-8 px-12 text-xl"
              onClick={() => {
                getAnswer(userPrompt);
              }}
            >
              Generate
            </Button>
          </div>
          <div className="py-12 text-xl flex items-center justify-center">
            {loading ? (
              <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
              />
            ) : (
              <div className="w-full">
                <CodeBlock
                  text={chatMessages.length !== 0 ? chatMessages : code}
                  language="javascript"
                  showLineNumbers
                  style={{ fontSize: "200px" }} // increase the font size here
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default Code;
