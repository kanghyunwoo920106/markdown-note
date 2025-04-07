"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark", "custom");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <select
      className="ml-2 px-2 py-1 border rounded"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">☀️ 라이트</option>
      <option value="dark">🌙 다크</option>
      <option value="custom">🎨 커스텀</option>
    </select>
  );
}