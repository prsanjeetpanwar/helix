import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import  {siteConfig} from "@/config/siteConfig"

const inter = Inter({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template:` %s | ${siteConfig.title}`

  }, description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
       <html lang="en" suppressHydrationWarning>
      <body
        className={cn(` antialiased`,
          "bg-white dark:bg-[#313338]"
        )}
      >
        <ThemeProvider attribute="class"
        enableSystem={false}
        defaultTheme="dark"
        storageKey="Helix"
        >
        {children}
        </ThemeProvider>
   
      </body>
    </html>
    </ClerkProvider>
   
  );
}
