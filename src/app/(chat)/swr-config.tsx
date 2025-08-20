"use client";
import { useEffect } from "react";
import { SWRConfig } from "swr";

export function SWRConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log(
      "%c █████  ███    ███ ██████  ██ ████████ ██  ██████  ███    ██\n██   ██ ████  ████ ██   ██ ██    ██    ██ ██    ██ ████   ██\n███████ ██ ████ ██ ██████  ██    ██    ██ ██    ██ ██ ██  ██\n██   ██ ██  ██  ██ ██   ██ ██    ██    ██ ██    ██ ██  ██ ██\n██   ██ ██      ██ ██████  ██    ██    ██  ██████  ██   ████\n\n%c🚀 Ambition AI - Advanced AI Assistant\nhttps://ambition-ai.com",
      "color: #00d4ff; font-weight: bold; font-family: monospace; font-size: 16px; text-shadow: 0 0 10px #00d4ff;",
      "color: #888; font-size: 12px;",
    );
  }, []);
  return (
    <SWRConfig
      value={{
        focusThrottleInterval: 30000,
        dedupingInterval: 2000,
        errorRetryCount: 1,
      }}
    >
      {children}
    </SWRConfig>
  );
}
