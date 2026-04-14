import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import { SplashScreen } from "@/components/SplashScreen";
import { ChatAssistant } from "@/components/ChatAssistant";
import { ModuleProvider } from "@/context/module-context";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM Podocarpus",
  description: "Sistema de gestión cooperativa - Autoridad Andina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0D1117] text-[#E6EDF3] font-sans selection:bg-[#2EA84F]/30 selection:text-white">
        <ModuleProvider>
          <SplashScreen />
          {children}
          <ChatAssistant />
        </ModuleProvider>
      </body>
    </html>
  );
}
