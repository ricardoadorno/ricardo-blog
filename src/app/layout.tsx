import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipLink } from "@/components/ui/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Ricardo Adorno | Developer & Designer",
    template: "%s | Ricardo Adorno",
  },
  description: "A showcase of modern web development, design patterns, and technical insights. Built with Next.js and passion.",
  metadataBase: new URL("https://ricardo-blog.com"),
  applicationName: "Ricardo's Portfolio",
  authors: [{ name: "Ricardo Adorno" }],
  creator: "Ricardo Adorno",
  publisher: "Ricardo Adorno",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ricardo-blog.com",
    title: "Ricardo Adorno | Developer & Designer",
    description: "Crafting exceptional digital experiences with modern web technologies.",
    siteName: "Ricardo Adorno",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo Adorno | Developer & Designer",
    description: "Crafting exceptional digital experiences with modern web technologies.",
    creator: "@ricardohandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-grow relative z-0">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
