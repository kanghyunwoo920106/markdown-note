"use client";
import { useState } from "react";
import { downloadFile } from "../utils/download";
import { uploadFile } from "../utils/upload";
import GitHubModal from "./GitHubModal";
import TemplateModal from "./TemplateModal";
import AlertModal from "./AlertModal";

export default function FileControls({ markdown, setMarkdown }) {
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "info", title: "" });

  const handleUpload = async (e) => {
    const content = await uploadFile(e);
    if (content) {
      setMarkdown(content);
      showAlert("파일 업로드 성공", "파일이 성공적으로 업로드되었습니다.", "success");
    }
  };

  const handleDownload = () => {
    downloadFile(markdown);
    showAlert("파일 다운로드", "파일이 다운로드되었습니다.", "success");
  };

  const showAlert = (title, message, type = "info") => {
    setAlert({
      show: true,
      title,
      message,
      type
    });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          onClick={handleDownload}
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
          onClick={() => setShowGitHubModal(true)}
        >
          🚀 GitHub에 저장
        </button>
        
        <button 
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors"
          onClick={() => setShowTemplateModal(true)}
        >
          📋 템플릿
        </button>
      </div>

      {/* GitHub 모달 */}
      <GitHubModal 
        isOpen={showGitHubModal}
        onClose={() => setShowGitHubModal(false)}
        markdown={markdown}
      />
      
      {/* 템플릿 모달 */}
      <TemplateModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        setMarkdown={setMarkdown}
      />
      
      {/* 알림 모달 */}
      <AlertModal
        isOpen={alert.show}
        onClose={closeAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </>
  );
}