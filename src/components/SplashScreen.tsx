"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Verificar si ya se mostró en esta sesión
    if (sessionStorage.getItem("splashShown")) {
      setLoading(false);
      return;
    }

    // Animación del porcentaje
    const duration = 4000; // 4s
    const startTime = performance.now();

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(progressValue));

      if (progressValue < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("splashShown", "true");
        }, 300); // pausa de 300ms
      }
    };

    requestAnimationFrame(animateProgress);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-andina-bg"
        >
          {/* Logo animado */}
          <div className="relative flex items-center justify-center w-32 h-32 mb-8">
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              initial={{ rotate: -90 }}
              animate={{ rotate: 270 }}
              transition={{ duration: 4, ease: "linear" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#21262D"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-andina-primary)"
                strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset="283"
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 4, ease: "easeInOut" }}
                strokeLinecap="round"
              />
            </motion.svg>
            <div className="text-4xl font-heading font-bold text-andina-text">
              P
            </div>
          </div>

          {/* Contador */}
          <div className="text-3xl font-mono text-andina-primary">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
