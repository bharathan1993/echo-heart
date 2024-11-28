'use client'

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type UseThemeProps } from "next-themes"

export interface ThemeProviderProps extends Omit<UseThemeProps, "children"> {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
