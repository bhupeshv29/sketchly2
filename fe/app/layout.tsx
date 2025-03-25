import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sketchly - Real-time Collaborative Drawing App",
  description: "Sketchly is a real-time multi-user drawing app that allows seamless collaboration and creative expression.",
  keywords: "real-time drawing, collaborative sketching, online whiteboard, creative tools, Sketchly",
  authors: [{ name: "bhupesh verma", url: "https://bhupesh.site" }],
  openGraph: {
    title: "Sketchly - Real-time Collaborative Drawing App",
    description: "Draw, collaborate, and bring ideas to life with Sketchly, the ultimate digital canvas.",
    url: "https://sketchly.vercel.app",
    siteName: "Sketchly",
    // images: [{ url: "https://yourwebsite.com/og-image.jpg", width: 1200, height: 630, alt: "Sketchly App" }],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@your_twitter_handle",
  //   creator: "@your_twitter_handle",
  //   title: "Sketchly - Real-time Collaborative Drawing App",
  //   description: "Real-time sketching and collaboration made easy with Sketchly.",
  //   images: ["https://yourwebsite.com/twitter-image.jpg"],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://bhupesh.site" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
