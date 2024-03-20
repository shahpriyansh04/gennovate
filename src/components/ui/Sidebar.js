/**
 * v0 by Vercel.
 * @see https://v0.dev/t/78V6CHNYtId
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="h-screen flex overflow-hidden bg-[#1a202c] dark:bg-black">
      <div className="flex flex-col w-64 border-r border-gray-800 bg-[#1a202c] dark:bg-black">
        <div className="flex items-center h-16 px-4 border-b border-gray-800">
          <Link
            className="flex items-center gap-2 text-xl font-bold text-gray-200 dark:text-gray-400"
            href="#"
          >
            <FlagIcon className="h-6 w-6 text-gray-200 dark:text-gray-400" />
            <span>App</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-2">
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-[#1a202c] dark:bg-black text-gray-200 dark:text-gray-400"
              href="#"
            >
              <HomeIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Dashboard</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <FileSearchIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Text Prompts</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <BarChartIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Analytics</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <TextIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Conversations</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <CalendarIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Calendar</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <MapIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Map</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <ImageIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Images</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <MusicIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Music</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md text-gray-200 dark:text-gray-400"
              href="#"
            >
              <VideoIcon className="h-4 w-4 text-gray-200 dark:text-gray-400" />
              <span>Videos</span>
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col w-full min-h-[0]">
        <div className="flex items-center h-16 px-4 border-b border-gray-800 bg-[#1a202c] dark:bg-black">
          <Button className="rounded-full ml-[-16px] md:hidden" variant="icon">
            <MenuIcon className="h-6 w-6 text-gray-200 dark:text-gray-400" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center gap-4 md:ml-4">
            <div className="flex items-center gap-2">
              <FileSearchIcon className="h-6 w-6 text-gray-200 dark:text-gray-400" />
              <h1 className="text-lg font-bold text-gray-200 dark:text-gray-400">
                Text Prompts
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <Button className="rounded-full" size="icon" variant="ghost">
              <SearchIcon className="w-4 h-4 text-gray-200 dark:text-gray-400" />
              <span className="sr-only">Search</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <BellIcon className="w-4 h-4 text-gray-200 dark:text-gray-400" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <img
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">User</span>
            </Button>
          </div>
        </div>
        <div className="flex min-h-[0]">
          <div className="flex-1 min-h-[0]">
            <div className="grid h-screen min-h-[0]">
              <div className="flex h-full items-center justify-center p-6">
                <div className="grid w-full gap-4 text-center md:gap-8">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-200 dark:text-gray-400">
                      Text Prompts
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Start typing and see the magic happen.
                    </p>
                  </div>
                  <div className="mx-auto max-w-sm">
                    <div className="grid gap-4">
                      <Button
                        className="bg-gray-800 text-gray-50 dark:bg-gray-200 dark:text-gray-800"
                        size="lg"
                      >
                        Generate Text
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function FileSearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v3" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="m9 18-1.5-1.5" />
    </svg>
  );
}

function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function MapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MusicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
