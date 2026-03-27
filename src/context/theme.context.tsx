import { createContext } from 'react'
import { theme } from 'antd'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  algorithm: typeof theme.darkAlgorithm | typeof theme.defaultAlgorithm
  colorPrimary: string
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  algorithm: theme.defaultAlgorithm,
  colorPrimary: '#1677ff',
})