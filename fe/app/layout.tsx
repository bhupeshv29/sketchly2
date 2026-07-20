import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sketchly - Real-time Collaborative Drawing App",
  description:
    "Sketchly is a real-time multi-user drawing app that allows seamless collaboration and creative expression.",
  keywords:
    "real-time drawing, collaborative sketching, online whiteboard, creative tools, Sketchly",
  authors: [{ name: "bhupesh verma", url: "https://bhupesh.site" }],
  openGraph: {
    title: "Sketchly - Real-time Collaborative Drawing App",
    description:
      "Draw, collaborate, and bring ideas to life with Sketchly, the ultimate digital canvas.",
    url: "https://sketchly.vercel.app",
    siteName: "Sketchly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning={true}>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://bhupesh.site" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
