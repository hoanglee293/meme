"use client";
import { useState } from "react";
import "@/styles/globals.css";
import Header from "@/app/components/Header";
import '@/libs/fontawesome'
import { LangProvider } from "@/lang/LangProvider";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          <ThemeProvider>
            <body
              className={`antialiased`}
            >
              <Header />
              <main className='grow'>{children}</main>
            </body>
          </ThemeProvider>
        </LangProvider>
      </QueryClientProvider>
    </html>
  );
}
