import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      id="features"
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  link,
  icon,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none px-4 py-2 dark:bg-transparent dark:border-white/[0.2] bg-transparent border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      <Link href={`/${link}`}>
        {header}
        <div className="flex flex-col h-full justify-center group-hover/bento:translate-x-2 transition duration-200">
          <div className="font-sans font-bold text-white dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-gray-200 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </Link>
    </div>
  );
};
