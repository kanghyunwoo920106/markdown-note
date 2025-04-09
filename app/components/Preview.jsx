"use client";
import { marked } from "marked";

export default function Preview({ markdown }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600 rounded-t-lg">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          미리보기
        </div>
      </div>
      <div
        className="prose dark:prose-invert max-w-full p-4 overflow-y-auto h-full"
        style={{ height: 'calc(100% - 45px)' }}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}