"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { useState, useEffect } from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { WaitlistModalProvider } from "@/contexts/WaitlistModalContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

function ProvidersWithRouter({
  children,
  themeProps,
}: {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <WaitlistModalProvider>{children}</WaitlistModalProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <NextThemesProvider {...themeProps}>
        <WaitlistModalProvider>{children}</WaitlistModalProvider>
      </NextThemesProvider>
    );
  }

  return (
    <ProvidersWithRouter themeProps={themeProps}>
      {children}
    </ProvidersWithRouter>
  );
}
