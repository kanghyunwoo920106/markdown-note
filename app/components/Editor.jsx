"use client";
import { useEffect, useState } from "react";
import AlertModal from "./AlertModal";

export default function Editor({ markdown, setMarkdown }) {
  const [history, setHistory] = useState([markdown]);
  const [index, setIndex] = useState(0);
  const [alertModal, setAlertModal] = useState({ show: false, message: "", type: "info" });

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
        showAlert("저장 완료", "문서가 성공적으로 저장되었습니다.", "success");
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [markdown]);

  const showAlert = (title, message, type = "info") => {
    setAlertModal({
      show: true,
      title,
      message,
      type
    });
    
    // 3초 후 자동으로 알림창 닫기
    setTimeout(() => {
      setAlertModal(prev => ({ ...prev, show: false }));
    }, 3000);
  };

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
    <>
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600 rounded-t-lg">
          <div className="flex items-center">
            <button 
              className="px-2.5 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded mr-2 hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
              onClick={undo}
              disabled={index === 0}
            >
              <span className="text-sm">↩️</span>
            </button>
            <button 
              className="px-2.5 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
              onClick={redo}
              disabled={index === history.length - 1}
            >
              <span className="text-sm">↪️</span>
            </button>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Markdown 에디터 <span className="text-xs opacity-70">(Ctrl+S로 저장)</span>
          </div>
        </div>
        <textarea
          className="flex-1 w-full p-4 outline-none resize-none dark:bg-gray-800 dark:text-white font-mono text-sm"
          value={markdown}
          onChange={handleChange}
          placeholder="마크다운을 입력하세요..."
          spellCheck="false"
          style={{ height: 'calc(100% - 45px)' }}
        />
      </div>

      <AlertModal
        isOpen={alertModal.show}
        onClose={() => setAlertModal(prev => ({ ...prev, show: false }))}
        title={alertModal.title || "알림"}
        message={alertModal.message}
        type={alertModal.type}
      />
    </>
  );
}