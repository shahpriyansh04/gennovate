import { Inter } from "next/font/google";
import { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HeroParallax } from "@/components/ui/hero-parallax";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [active, setActive] = useState(true);
  return (
    <div
      className="flex flex-col items-center justify-center"
      onClick={() => setActive(!active)}
    >
      <div className="flex py-6 px-40 justify-between items-center bg-bl ack w-full">
        <p className="text-2xl font-bold">Logo</p>
        <FloatingNav />

        <ModeToggle />
      </div>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          Backgrounds
        </p>
      </div>
      {/* <div className="mt-20 text-7xl text-center font-bold grid gap-5 justify-center">
        <p>Empower your creative</p>
        <p>Craft with AI Support</p>
        <p className="text-2xl mt-6 font-medium">
          Generate countless ideas quickly and elevate your creative process
          effortlessly.
        </p>
        <div className=" flex justify-center mt-12">
          <Button size="lg" className="text-xl">
            Start Building Now
            <ArrowRight className="ml-3" />
          </Button>
        </div>
      </div> */}
      <HeroParallax />
      <BentoGrid className="max-w-4xl mx-auto" id="features">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={<Sun />}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
      <footer
        className="bg-primary-foreground w-full text-muted-foreground p-6 mt-12"
        id="contact"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Your Company</h1>
            <p>1234 Street Name</p>
            <p>City, State, Zip</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">Links</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Follow Us</h2>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
  },
];
