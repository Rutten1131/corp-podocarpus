"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function EntreRiosLogo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 text-xl",
    lg: "w-16 h-16 text-3xl"
  };

  return (
    <div className={`relative flex items-center justify-center font-heading font-black rounded-xl border border-andina-border bg-andina-surface shadow-lg group overflow-hidden ${sizes[size]} ${className}`}>
      {/* Background Double Tree Motif */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center gap-1 group-hover:opacity-40 transition-opacity">
         <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-andina-primary">
            <path d="m12 19 7-7 3 3-7 7-3-3z"/>
            <path d="m18 13-1.5-7.5L12 2l-4.5 3.5L6 13l6 6 6-6z"/>
            <path d="m12 19-7-7-3 3 7 7 3-3z"/>
         </svg>
      </div>
      
      {/* The "E" for Entre Ríos */}
      <span className="relative z-10 text-andina-primary drop-shadow-[0_0_8px_rgba(46,168,79,0.4)]">
        E
      </span>
      
      {/* Animated accent */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-tr from-andina-primary/20 via-transparent to-andina-accent/10"
      />
    </div>
  );
}

// Version with trees
export function EntreRiosLogoWithTrees({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-xl">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2EA84F" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      {/* Outer Glow */}
      <circle cx="50" cy="50" r="48" fill="rgba(46,168,79,0.05)" />
      {/* Main Circle */}
      <circle cx="50" cy="50" r="42" fill="#161B22" stroke="#21262D" strokeWidth="2" />
      {/* Double Trees */}
      <path d="M40 70 L50 20 L60 70 Z" fill="#2EA84F" opacity="0.6" />
      <path d="M45 75 L55 25 L65 75 Z" fill="#2EA84F" />
      {/* Trunk */}
      <rect x="44" y="70" width="2" height="10" fill="#E6EDF3" opacity="0.4" />
      <rect x="54" y="75" width="2" height="5" fill="#E6EDF3" opacity="0.4" />
      {/* The Letter E */}
      <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#E6EDF3" fontSize="40" fontWeight="900" fontFamily="sans-serif">E</text>
    </svg>
  );
}
