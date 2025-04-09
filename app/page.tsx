"use client";
import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import ThemeToggle from "./components/ThemeToggle";
import FileControls from "./components/FileControls";

export default function Home() {
  const [markdown, setMarkdown] = useState("# Hello Markdown\n\n이건 *마크다운 메모장*입니다!");

  useEffect(() => {
    // 로컬 스토리지에서 이전 작성 내용 불러오기
    const saved = localStorage.getItem("markdown");
    if (saved) setMarkdown(saved);
  }, []);

  // 마크다운 변경시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("markdown", markdown);
  }, [markdown]);

  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-6xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">📝 마크다운 메모장</h1>
        <div className="flex flex-wrap items-center gap-2">
          <FileControls markdown={markdown} setMarkdown={setMarkdown} />
          <ThemeToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl h-[75vh]">
        <div className="rounded-lg overflow-hidden shadow-md">
          <Editor markdown={markdown} setMarkdown={setMarkdown} />
        </div>
        <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
          <Preview markdown={markdown} />
        </div>
      </div>
    </main>
  );
}