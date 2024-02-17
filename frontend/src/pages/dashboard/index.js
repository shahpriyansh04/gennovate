import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Home, HomeIcon, PcCaseIcon, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CodeBlock, CopyBlock } from "react-code-blocks";

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

function Dashboard() {
  return (
    <div className="h-screen flex-col flex items-start">
      <Navbar navItems={navItems} />

      <BentoGrid className="mt-12">
        {items.map((item, i) => {
          return (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              link={item.link}
              className={i === 3 || i === 6 ? "md:col-span-2 " : ""}
            />
          );
        })}
      </BentoGrid>
    </div>
  );
}

export default Dashboard;
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Code Generator",
    description: "Get the tech stack behind.",
    header: <Skeleton />,
    link: "/dashboard/chats",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Image to Code",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    link: "/image-to-code",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Data Visualisation",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    link: "/data",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Function Code",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    link: "/code",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Coming Soon...",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    link: "/dashboard",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
];
