"use client";
import { useState } from "react";
import Modal from "./Modal";
import { uploadToGitHub } from "../utils/github";

export default function GitHubModal({ isOpen, onClose, markdown }) {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [repo, setRepo] = useState("");
  const [path, setPath] = useState("notes/note.md");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState({ status: null, message: "" });

  const handleUpload = async () => {
    if (!token || !username || !repo || !path) {
      setResult({
        status: "error",
        message: "모든 필드를 입력해주세요."
      });
      return;
    }

    setIsUploading(true);
    setResult({ status: null, message: "" });

    try {
      const response = await uploadToGitHub(markdown, token, username, repo, path);
      setResult({
        status: "success",
        message: "GitHub에 성공적으로 업로드되었습니다!"
      });
    } catch (error) {
      setResult({
        status: "error",
        message: `업로드 실패: ${error.message}`
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setToken("");
    setUsername("");
    setRepo("");
    setPath("notes/note.md");
    setResult({ status: null, message: "" });
  };

  // 모달이 닫힐 때 폼 초기화
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="GitHub에 저장"
      confirmText="업로드"
      onConfirm={handleUpload}
      showConfirm={!result.status}
    >
      {result.status ? (
        <div className={`p-4 mb-4 rounded ${result.status === "success" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"}`}>
          <p>{result.message}</p>
          {result.status === "success" && (
            <a 
              href={`https://github.com/${username}/${repo}/blob/main/${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-600 dark:text-blue-400 underline"
            >
              GitHub에서 보기
            </a>
          )}
          <button 
            onClick={resetForm}
            className="mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-sm"
          >
            다시 업로드하기
          </button>
        </div>
      ) : (
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="ghp_xxxxxxxxxxxx"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              <a 
                href="https://github.com/settings/tokens" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub 토큰 생성하기
              </a>
              (repo 권한 필요)
            </p>
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">사용자명</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="github 사용자명"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">저장소 이름</label>
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="repository 이름"
            />
          </div>
          
          <div>
            <label className="block mb-1 text-sm font-medium">파일 경로</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              placeholder="notes/note.md"
            />
          </div>
          
          {isUploading && (
            <div className="flex justify-center">
              <div className="loader">업로드 중...</div>
            </div>
          )}
        </form>
      )}
    </Modal>
  );
} 