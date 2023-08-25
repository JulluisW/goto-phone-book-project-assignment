"use client";

import { makeClient } from "@/lib/client-2";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Phone Book",
  description: "Goto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        style={{
          background: "url('/background.jpg')",
          backgroundSize: "cover",
        }}
      >
        <ApolloNextAppProvider makeClient={makeClient}>
          {children}
        </ApolloNextAppProvider>
      </body>
    </html>
  );
}
