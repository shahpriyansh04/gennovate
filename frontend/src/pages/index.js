import { Inter } from "next/font/google";
import { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  const [active, setActive] = useState(true);
  return (
    <div
      className="flex flex-col items-center justify-center overflow-x-hidden"
      onClick={() => setActive(!active)}
    >
      <Navbar />
      <HeroParallax />
      <HoverEffect />
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
