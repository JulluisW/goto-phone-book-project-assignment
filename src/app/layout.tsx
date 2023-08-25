"use client";

import { makeClient } from "@/lib/client-2";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

import "./style.scss";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "My Phone Book",
//   description: "Goto",
// };

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
          background: "rgb(5, 55, 5)",
        }}
      >
        <ApolloNextAppProvider makeClient={makeClient}>
          <div
            style={{
              background: "url('/background_new.jpg')",
              backgroundSize: "cover",
              maxWidth: "1200px",
              padding: "30px",
              height: "100vh",
              minHeight: "700px",
              margin: "auto",
            }}
          >
            {children}
          </div>
        </ApolloNextAppProvider>
      </body>
    </html>
  );
}
