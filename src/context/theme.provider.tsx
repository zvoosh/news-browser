import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { ThemeContext } from "./theme.context";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  const algorithm = isDark ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const colorPrimary = isDark ? "#1677FF" : "#00000";

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme, algorithm, colorPrimary }}
    >
      <ConfigProvider theme={{ algorithm, token: { colorPrimary } }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
