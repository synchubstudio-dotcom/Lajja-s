import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toast } from "@/components/ui/Toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#9a3412",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebSiteSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 selection:bg-kesari-200 selection:text-terracotta-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <Toast />
      </body>
    </html>
  );
}
