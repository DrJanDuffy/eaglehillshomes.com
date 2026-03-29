import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.eaglehillshomes.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eagle Hills Homes | Las Vegas Area Real Estate",
    template: "%s | Eagle Hills Homes",
  },
  description:
    "Homes and real estate in the Eagle Hills area. Connect with a local agent for buyers, sellers, and market guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
