"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PodocarpusLogo } from "./PodocarpusLogo";

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
          <PodocarpusLogo size="md" />
          <span className="text-xl font-heading font-black text-white tracking-tighter uppercase group-hover:text-andina-primary transition-colors">
            Podocarpus
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-andina-text/60 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-andina-primary hover:bg-andina-primary/90 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:shadow-[0_0_20px_rgba(46,168,79,0.4)]"
          >
            Acceso Socios
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-andina-bg border-b border-andina-border p-6 flex flex-col gap-4 shadow-2xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-andina-text/80"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="bg-andina-primary px-6 py-3 rounded-xl text-center font-bold text-white"
          >
            Acceso VIP Socios
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
