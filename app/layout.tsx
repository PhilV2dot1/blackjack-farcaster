import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Blackjack on Celo",
  description: "Play Blackjack on-chain! Free mode or compete on Celo blockchain.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Blackjack on Celo",
    description: "Play Blackjack on-chain with Farcaster!",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    "fc:miniapp": JSON.stringify({
      version: "1",
      imageUrl: `${baseUrl}/og-image.png`,
      button: {
        title: "Play Blackjack",
        action: {
          type: "launch_miniapp",
          name: "Blackjack on Celo",
          url: baseUrl,
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
