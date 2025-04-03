import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navBar";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Volunteer Support System",
  description: "A system that manages voluntary activities",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
// import { QueryClient, QueryClientProvider } from 'react-query';

// import Navbar from "~/app/_components/Navbar";
// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          <TRPCReactProvider>
            <main className="flex min-h-screen flex-col">
              <Navbar />
              {children}
              <Footer />
            </main>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
