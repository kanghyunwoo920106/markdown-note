"use client";
import { useState } from "react";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import ThemeToggle from "../components/ThemeToggle";
import { downloadFile } from "../utils/download";

export default function Home() {
  const [markdown, setMarkdown] = useState("# Hello Markdown\n\n이건 *마크다운 메모장*입니다!");

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-6xl flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📝 마크다운 메모장</h1>
        <div className="flex items-center">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
            onClick={() => downloadFile(markdown)}
          >
            📥 다운로드
          </button>
          <ThemeToggle />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl h-[75vh]">
        <Editor markdown={markdown} setMarkdown={setMarkdown} />
        <Preview markdown={markdown} />
      </div>
    </main>
  );
}