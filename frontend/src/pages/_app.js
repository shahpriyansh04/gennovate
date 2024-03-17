import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { createTheme, MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkLoading>
          <p>Loading...</p>
        </ClerkLoading>
        <ClerkLoaded>
          <ConvexProvider client={convex}>
            <Toaster position="bottom-center" richColors visibleToasts={1} />

            <Component {...pageProps} />
          </ConvexProvider>
        </ClerkLoaded>
      </ThemeProvider>
    </ClerkProvider>
  );
}
