"use client";
import ReactModal from "react-modal";
import { useEffect } from "react";

// 앱 요소 지정 (접근성을 위해 필요)
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body');
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
  },
};

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  confirmText = "확인", 
  cancelText = "취소",
  onConfirm = null,
  showCancel = true,
  showConfirm = true,
}) {
  // 모달이 열릴 때 ESC 키로 닫을 수 있도록 설정
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel={title}
      className="outline-none"
    >
      <div className="dark:bg-gray-800 dark:text-white">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        {(showCancel || showConfirm) && (
          <div className="flex justify-end gap-2">
            {showCancel && (
              <button 
                onClick={onClose} 
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                {cancelText}
              </button>
            )}
            
            {showConfirm && onConfirm && (
              <button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }} 
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
              >
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </ReactModal>
  );
} 