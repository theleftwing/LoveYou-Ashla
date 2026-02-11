import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ✅ Metadata (ONLY title + description here) */
export const metadata = {
  title: "Valentine Surprise 💖",
  description: "A special Valentine week surprise website",
};

/* ✅ Viewport settings moved here (NEW Next.js way) */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a1c3a", // romantic dark pink
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

