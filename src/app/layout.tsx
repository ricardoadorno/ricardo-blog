import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SkipLink } from "@/components/ui/SkipLink";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
});

export const metadata: Metadata = {
  title: "Ricardo's Blog",
  description: "A blog about web development, design, and technology",
  metadataBase: new URL("https://ricardo-blog.com"),
  applicationName: "Ricardo's Blog",
  authors: [{ name: "Ricardo" }],
  creator: "Ricardo",
  publisher: "Ricardo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ricardo-blog.com",
    title: "Ricardo's Blog",
    description: "A blog about web development, design, and technology",
    siteName: "Ricardo's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ricardo's Blog",
    description: "A blog about web development, design, and technology",
    creator: "@ricardohandle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

// Track web vitals
// export function reportWebVitals(metric: any) {
//   // Optional: implement analytics tracking for Web Vitals
//   console.log(metric);
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Add skip link for accessibility */}
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>

        {/* Analytics script loaded with low priority */}
        {/* <Script
          src="https://analytics-example.com/script.js"
          strategy="lazyOnload"
          onLoad={() => {
            console.log('Analytics script loaded');
          }}
        /> */}
      </body>
    </html>
  );
}
