import React from "react";
import { FloatingNav } from "./floating-navbar";
import { ModeToggle } from "./mode-toggle";
import { Home } from "lucide-react";

function Navbar({
  navItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Features",
      link: "#features",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ],
}) {
  return (
    <div className="flex py-6 px-40 justify-between items-center bg-bl ack w-full">
      <p className="text-4xl font-bold">GenNovate</p>
      <FloatingNav navItems={navItems} />

      <ModeToggle />
    </div>
  );
}

export default Navbar;
