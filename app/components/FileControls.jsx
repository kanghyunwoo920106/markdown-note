"use client";
import { downloadFile } from "../utils/download";
import { uploadFile } from "../utils/upload";
import { uploadToGitHub } from "../utils/github";
import { getTemplates } from "../utils/templates";
import { useState } from "react";

export default function FileControls({ markdown, setMarkdown }) {
  const [showTemplates, setShowTemplates] = useState(false);
  const templates = getTemplates();

  const handleUpload = async (e) => {
    const content = await uploadFile(e);
    if (content) setMarkdown(content);
  };

  const handleGitHubUpload = () => {
    uploadToGitHub(markdown);
  };

  const loadTemplate = (template) => {
    if (window.confirm("현재 내용을 템플릿으로 바꾸시겠습니까?")) {
      setMarkdown(templates[template]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
        onClick={() => downloadFile(markdown)}
      >
        📥 다운로드
      </button>
      
      <label className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded cursor-pointer transition-colors">
        📤 업로드
        <input
          type="file"
          accept=".md,.txt"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
      
      <button
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
        onClick={handleGitHubUpload}
      >
        🚀 GitHub에 저장
      </button>
      
      <div className="relative">
        <button 
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
          onClick={() => setShowTemplates(!showTemplates)}
        >
          📋 템플릿
        </button>
        
        {showTemplates && (
          <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-10">
            {Object.keys(templates).map((key) => (
              <button 
                key={key}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  loadTemplate(key);
                  setShowTemplates(false);
                }}
              >
                {key === "default" ? "기본 템플릿" : "회의록 템플릿"}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}