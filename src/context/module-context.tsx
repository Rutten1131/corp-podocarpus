"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type VisibilityMap = {
  [key: string]: boolean;
};

interface ModuleContextType {
  visibility: VisibilityMap;
  toggleModule: (href: string) => void;
  isModuleVisible: (href: string) => boolean;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const DEFAULT_VISIBILITY: VisibilityMap = {
  "/dashboard/socios": true,
  "/dashboard/tracking": true,
  "/dashboard/contabilidad": true,
  "/dashboard/marketing": true,
  "/dashboard/publicidad": true,
  "/dashboard/monetizacion": true,
  "/dashboard/cobranzas": true,
  "/dashboard/rutas": true,
  "/dashboard/padres": true,
  "/dashboard/mantenimiento": true,
};

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState<VisibilityMap>(DEFAULT_VISIBILITY);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('module_visibility');
    if (saved) {
      try {
        setVisibility(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading module visibility", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('module_visibility', JSON.stringify(visibility));
    }
  }, [visibility, isLoaded]);

  const toggleModule = (href: string) => {
    setVisibility(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const isModuleVisible = (href: string) => {
    if (!isLoaded) return true; // Default to visible during hydration
    return visibility[href] !== false; // Visible by default if not specified
  };

  return (
    <ModuleContext.Provider value={{ visibility, toggleModule, isModuleVisible }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (context === undefined) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
};
