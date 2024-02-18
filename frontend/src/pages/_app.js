import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { createTheme, MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";

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
          <Component {...pageProps} />
        </ClerkLoaded>
      </ThemeProvider>
    </ClerkProvider>
  );
}
