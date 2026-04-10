"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // For now, using a Server Action or a simple cookie-based auth check
    // This is a placeholder for the actual auth logic
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Access Denied.");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#111111] border border-white/10 p-12 rounded-sm shadow-2xl text-center"
      >
        <div className="w-16 h-16 bg-[#c9a84c]/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#c9a84c]/30">
          <FaLock className="text-[#c9a84c] text-2xl" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Galaxy Admin</h1>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-10">Bespoke Portal Access</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password" 
              placeholder="ENTER PASSCODE"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 text-white p-5 rounded-sm outline-none focus:border-[#c9a84c] transition-all text-center tracking-[0.5em] text-xs font-bold"
              required
            />
          </div>
          
          {error && <p className="text-red-500 text-xs font-bold tracking-widest">{error}</p>}
          
          <button 
            type="submit"
            className="w-full bg-[#c9a84c] text-[#111111] font-bold py-5 rounded-sm uppercase tracking-[0.3em] text-xs hover:bg-[#dac175] transition-all"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-12">
          <p className="text-[12px] text-white/20 tracking-[0.2em] font-light">SYSTEM SECURE • GALAXY EVENTS OS v1.0</p>
        </div>
      </motion.div>
    </main>
  );
}
