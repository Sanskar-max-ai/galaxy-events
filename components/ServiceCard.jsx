"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaReact } from "react-icons/fa"; // fallback icon

export default function ServiceCard({ title, description, image, icon: Icon = FaReact, delay = 0, href = "/services", onClick }) {
  return (
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.97 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div 
        onClick={onClick}
        className="cursor-pointer h-full group perspective-1000"
      >
        <div className="bg-[#1a1a1a] border border-white/5 p-8 h-full transition-all duration-500 hover:border-[#c9a84c]/50 hover:bg-[#1f1f1f] relative overflow-hidden flex flex-col items-start glass-panel">
          
          {/* Ethereal gold glow effect */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-[80px] group-hover:bg-[#c9a84c]/15 transition-all duration-700" />
          
          {/* Visual Image */}
          {image && (
            <div className="relative w-full h-48 md:h-56 mb-6 overflow-hidden border border-white/5 shrink-0 group-hover:border-[#c9a84c]/40 transition-all duration-500 rounded-sm">
              <Image 
                src={image} 
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4 z-10 w-full">
            <div className="p-3 bg-[#111111] rounded-sm text-[#c9a84c] border border-white/5 group-hover:scale-110 group-hover:border-[#c9a84c]/50 transition-all duration-500 shrink-0 shadow-lg">
              <Icon size={20} />
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-white tracking-wide group-hover:text-[#c9a84c] transition-colors duration-300">
              {title}
            </h3>
          </div>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 flex-grow z-10 font-light line-clamp-3 md:line-clamp-none">
            {description}
          </p>

          <div className="mt-auto flex items-center text-[12px] tracking-[0.3em] text-[#c9a84c] uppercase font-bold">
            <span className="mr-3">Discover Details</span>
            <span className="w-10 h-[1px] bg-[#c9a84c] group-hover:w-16 transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
