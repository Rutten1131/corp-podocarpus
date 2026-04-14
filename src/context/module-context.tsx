"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type VisibilityMap = {
  [key: string]: boolean;
};

interface ConfigSettings {
  aiEnabled: boolean;
  evolutionApiUrl: string;
  evolutionApiKey: string;
  evolutionInstance: string;
  notificationNumbers: string;
  welcomeMessage: string;
}

interface ModuleContextType {
  visibility: VisibilityMap;
  settings: ConfigSettings;
  toggleModule: (href: string) => void;
  isModuleVisible: (href: string) => boolean;
  updateSettings: (newSettings: Partial<ConfigSettings>) => void;
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

const DEFAULT_SETTINGS: ConfigSettings = {
  aiEnabled: true,
  evolutionApiUrl: "",
  evolutionApiKey: "",
  evolutionInstance: "",
  notificationNumbers: "",
  welcomeMessage: "¡Hola! Soy el asistente virtual de Cooperativa Podocarpus. ¿En qué puedo ayudarte hoy?",
};

export const ModuleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState<VisibilityMap>(DEFAULT_VISIBILITY);
  const [settings, setSettings] = useState<ConfigSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedVisibility = localStorage.getItem('module_visibility');
    const savedSettings = localStorage.getItem('app_settings');
    
    if (savedVisibility) {
      try { setVisibility(JSON.parse(savedVisibility)); } catch (e) { console.error(e); }
    }
    if (savedSettings) {
      try { setSettings(JSON.parse(savedSettings)); } catch (e) { console.error(e); }
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('module_visibility', JSON.stringify(visibility));
      localStorage.setItem('app_settings', JSON.stringify(settings));
      // Dispatch storage event for cross-tab sync
      window.dispatchEvent(new Event("storage"));
    }
  }, [visibility, settings, isLoaded]);

  const toggleModule = (href: string) => {
    setVisibility(prev => ({
      ...prev,
      [href]: !prev[href]
    }));
  };

  const isModuleVisible = (href: string) => {
    if (!isLoaded) return true;
    return visibility[href] !== false;
  };

  const updateSettings = (newSettings: Partial<ConfigSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ModuleContext.Provider value={{ visibility, settings, toggleModule, isModuleVisible, updateSettings }}>
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
