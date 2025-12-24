import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer, AudioPlayerWrapper } from "@/components/layout";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "podcast",
    "endangered species",
    "conservation",
    "wildlife",
    "nature",
    "biodiversity",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <AudioPlayerWrapper>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AudioPlayerWrapper>
      </body>
    </html>
  );
}
