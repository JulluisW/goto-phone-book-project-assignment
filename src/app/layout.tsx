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
      <head>
        
      </head>
      <body
        style={{
          background: "black",
        }}
      >
        {children}
      </body>
    </html>
  );
}
