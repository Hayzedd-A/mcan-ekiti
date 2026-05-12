import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MCAN Ekiti State Chapter",
  description:
    "Muslim Corpers' Association of Nigeria – Ekiti State Chapter. Serving Islam through the nation.",
  icons: {
    icon: "/images/mcan-logo.webp",
  },
  authors: [{ name: "Hayzedd" }],
  creator: "ZeddHub",
  publisher: "ZeddHub",
  openGraph: {
    title: "MCAN Ekiti State Chapter",
    description:
      "Muslim Corpers' Association of Nigeria – Ekiti State Chapter. Serving Islam through the nation.",
    url: "https://mcanekiti.com.ng",
    siteName: "MCAN Ekiti",
    images: [
      {
        url: "/images/mcan-logo.webp",
        width: 1200,
        height: 630,
        alt: "MCAN Ekiti",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MCAN Ekiti",
    url: "https://mcanekiti.com.ng",
    creator: {
      "@type": "Person",
      name: "Hayzedd",
      worksFor: {
        "@type": "Organization",
        name: "ZeddHub",
      },
    },
  };
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
