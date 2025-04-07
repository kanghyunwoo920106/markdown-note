"use client";
import { downloadFile } from "../utils/download";
import { uploadFile } from "../utils/upload";
import { uploadToGitHub } from "../utils/github";
import { getTemplates } from "../utils/templates";

export default function FileControls({ markdown, setMarkdown }) {
  const handleUpload = async (e) => {
    const content = await uploadFile(e);
    setMarkdown(content);
  };

  const handleGitHubUpload = () => {
    uploadToGitHub(markdown);
  };

  const loadTemplate = () => {
    const templates = getTemplates();
    const selected = prompt("템플릿 이름을 입력하세요 (ex: default):");
    if (selected && templates[selected]) {
      setMarkdown(templates[selected]);
    } else {
      alert("❌ 템플릿이 존재하지 않아요");
    }
  };

  return (
    <div className="space-x-2">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => downloadFile(markdown)}
      >
        📥 다운로드
      </button>
      <label className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">
        📤 업로드
        <input
          type="file"
          accept=".md"
          onChange={handleUpload}
          className="hidden"
        />
      </label>
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded"
        onClick={handleGitHubUpload}
      >
        🚀 GitHub 업로드
      </button>
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded"
        onClick={loadTemplate}
      >
        📋 템플릿 불러오기
      </button>
    </div>
  );
}