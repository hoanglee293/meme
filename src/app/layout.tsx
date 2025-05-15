"use client";
import { useState } from "react";
import Script from 'next/script';
import "@/styles/globals.css";
import Header from "@/app/components/Header";
import '@/libs/fontawesome'
import { LangProvider } from "@/lang/LangProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VideoBackground from "./components/VideoBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
      },
    },
  }));

  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <ThemeProvider>
            <body
              className={`antialiased`}
            >
              <Header />
              <VideoBackground />
              <main className='grow dark:bg-[#000000a8]'>{children}</main>
            </body>
          </ThemeProvider>
        </LangProvider>
      </QueryClientProvider>
    </html>
  );
}
