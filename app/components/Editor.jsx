"use client";
import { useEffect, useState } from "react";

export default function Editor({ markdown, setMarkdown }) {
  const [history, setHistory] = useState([markdown]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("markdown", markdown);
    }, 2000); // 자동 저장 간격: 2초
    return () => clearInterval(interval);
  }, [markdown]);

  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        localStorage.setItem("markdown", markdown);
        alert("✅ 저장되었습니다");
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [markdown]);

  const handleChange = (e) => {
    const value = e.target.value;
    const newHistory = history.slice(0, index + 1);
    setHistory([...newHistory, value]);
    setIndex(newHistory.length);
    setMarkdown(value);
  };

  const undo = () => {
    if (index > 0) {
      setIndex(index - 1);
      setMarkdown(history[index - 1]);
    }
  };

  const redo = () => {
    if (index < history.length - 1) {
      setIndex(index + 1);
      setMarkdown(history[index + 1]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-2 space-x-2">
        <button className="px-2 py-1 border rounded" onClick={undo}>↩️ Undo</button>
        <button className="px-2 py-1 border rounded" onClick={redo}>↪️ Redo</button>
      </div>
      <textarea
        className="flex-1 w-full p-4 border rounded-lg dark:bg-gray-800 dark:text-white"
        value={markdown}
        onChange={handleChange}
      />
    </div>
  );
}