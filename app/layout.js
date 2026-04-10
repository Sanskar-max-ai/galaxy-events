import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Galaxy Events | Premium Event Management",
  description: "Where Every Moment Becomes a Memory. High-end event management in Hoshangabad, Madhya Pradesh.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-0 selection:bg-[#c9a84c] selection:text-[#111111] bg-[#0a0a0a]">
        <Navbar />
        <main className="flex-1 relative pb-[68px] md:pb-0">{children}</main>
        <Footer />
        
        {/* Sticky Mobile CTA */}
        <div className="md:hidden fixed bottom-0 w-full z-[999] sticky-mobile-cta">
          <a 
            href="tel:+910000000000" 
            className="block w-full bg-[#c9a84c] text-[#111111] font-bold text-center py-4 px-5 text-[15px] uppercase tracking-wider shadow-[0_-4px_20px_rgba(0,0,0,0.5)] active:bg-[#dac175] transition-colors"
          >
            Book Your Event
          </a>
        </div>
      </body>
    </html>
  );
}
