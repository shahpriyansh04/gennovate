import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";
import { Code, HomeIcon } from "lucide-react";

export default function DashboardGrid() {
  return (
    <div className="flex-1 min-h-[0]">
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

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Prompt2Code",
    description: "Unlock the power of multiple languages",
    header: (
      <div className="w-full h-[9rem] ">
        <img src="1.png" alt="" className="object-contain w-full h-full" />
      </div>
    ),
    link: "/dashboard/chats",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Sketch The Site",
    description:
      "Effortlessly translate images or sketches into HTML code with CSS.",
    header: (
      <div className="w-full h-[9rem] ">
        <img src="2.png" alt="" className="object-contain w-full h-full" />
      </div>
    ),
    link: "/dashboard/image-to-code",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "CodeSense",
    description: "Utilize cutting-edge technology to provide detailed code",
    header: (
      <div className="w-full h-[9rem] ">
        <img src="3.png" alt="" className="object-contain w-full h-full" />
      </div>
    ),
    link: "/dashboard/code",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "JsonMapper",
    description: "Convert structured JSON input to desired output",
    header: (
      <div className="w-full h-[9rem] flex gap-5">
        <img src="5.png" alt="" className="object-contain w-full h-full" />

        <img src="4.png" alt="" className="object-contain w-full h-full" />
      </div>
    ),
    link: "/dashboard/data",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Error handling",
    description: "Instanly analyse codes, detect errors",
    header: (
      <div className="w-full h-[9rem] ">
        <img src="3.png" alt="" className="object-contain w-full h-full" />
      </div>
    ),
    link: "/dashboard",

    icon: <HomeIcon className="h-4 w-4 text-neutral-500" />,
  },
];
