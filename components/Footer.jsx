import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <Link href="/">
              <h2 className="text-2xl font-heading font-semibold text-[#c9a84c] tracking-wider uppercase">
                Galaxy Events
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Where Every Moment Becomes a Memory. Premium event management and cinematic styling based in Hoshangabad, Madhya Pradesh.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#c9a84c] hover:border-[#c9a84c] transition-all">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading text-lg tracking-wide mb-6 uppercase">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors flex items-center min-h-[44px]"
                  >
                    <span className="w-2 h-[1px] bg-[#c9a84c] mr-3 opacity-0 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-heading text-lg tracking-wide mb-6 uppercase">Our Services</h3>
            <ul className="space-y-3">
              {["Premium Weddings", "SFX & Pyrotechnics", "Venue Decor", "Birthday Celebrations", "Haldi & Mehndi"].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors flex items-center min-h-[44px]">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-heading text-lg tracking-wide mb-6 uppercase">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="text-[#c9a84c] font-bold mr-2 mt-0.5">A.</span>
                Hoshangabad (Narmadapuram)<br />Madhya Pradesh, India
              </li>
              <li className="flex items-center min-h-[44px]">
                <span className="text-[#c9a84c] font-bold mr-2">P.</span>
                <a href="tel:+910000000000" className="hover:text-white transition-colors">+91 00000 00000</a>
              </li>
              <li className="flex items-center min-h-[44px]">
                <span className="text-[#c9a84c] font-bold mr-2">E.</span>
                <a href="mailto:info@galaxyevents.com" className="hover:text-white transition-colors">info@galaxyevents.com</a>
              </li>
              <li>
                <a 
                  href="https://wa.me/910000000000" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[#c9a84c] font-medium hover:text-[#dac175] transition-colors"
                >
                  <FaWhatsapp className="mr-2" size={18} /> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Galaxy Events. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
