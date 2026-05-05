"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { EntreRiosLogo } from "./EntreRiosLogo";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Promociones", href: "/promociones" },
  { name: "Portal Socios", href: "/portal-info" },
  { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-andina-bg/80 backdrop-blur-md border-b border-andina-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <EntreRiosLogo size="md" />
          <span className="text-xl font-heading font-black text-white tracking-tighter uppercase group-hover:text-andina-primary transition-colors">
            Entre Ríos
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-bold text-andina-text/80 hover:text-white transition-colors tracking-tight"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-andina-primary hover:bg-andina-primary/90 px-6 py-2.5 rounded-full text-sm font-black text-white transition-all hover:shadow-[0_0_20px_rgba(46,168,79,0.4)] uppercase tracking-tighter"
          >
            Acceso Socios
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-andina-bg/95 backdrop-blur-2xl border-b border-andina-border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-heading font-black text-white flex items-center justify-between group"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={20} className="text-andina-primary opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/login" 
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-andina-primary px-6 py-5 rounded-2xl text-center font-black text-white uppercase tracking-widest shadow-lg flex items-center justify-center gap-3"
                >
                  Acceso VIP Socios
                  <ChevronRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
