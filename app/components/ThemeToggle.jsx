"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    
    // 처음 로드 시 body 클래스 설정
    document.body.classList.remove("light", "dark", "custom");
    document.body.classList.add(saved);
  }, []);

  useEffect(() => {
    document.body.classList.remove("light", "dark", "custom");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeOptions = [
    { value: "light", label: "☀️ 라이트", bg: "bg-white" },
    { value: "dark", label: "🌙 다크", bg: "bg-gray-800" },
    { value: "custom", label: "🎨 커스텀", bg: "bg-gradient-to-r from-purple-500 to-pink-500" }
  ];

  const currentTheme = themeOptions.find(t => t.value === theme);

  return (
    <div className="relative">
      <button
        className="flex items-center px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mr-1">{currentTheme?.label.split(" ")[0]}</span>
        <span className="text-sm">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          {themeOptions.map((option) => (
            <button 
              key={option.value}
              className={`flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${theme === option.value ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
              onClick={() => {
                setTheme(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}