import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Home, PcCaseIcon, Trash } from "lucide-react";
import React from "react";
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { JsonInput } from "@mantine/core";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

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
    link: "/dashboard/data",
    icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

function Code() {
  return (
    <div className="h-screen flex-col flex items-center">
      <Navbar navItems={navItems} />
    </div>
  );
}

export default Code;
