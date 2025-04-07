"use client";
import { useEffect, useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import ThemeToggle from "./components/ThemeToggle";
import FileControls from "./components/FileControls";
import Image from "next/image";

export default function Home() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("markdown");
    if (saved) setMarkdown(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <main className="flex flex-col items-center text-center">
          <div className="mb-12">
            <Image
              className="dark:invert transform hover:scale-105 transition-transform duration-300"
              src="/next.svg"
              alt="Next.js logo"
              width={200}
              height={42}
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome to Next.js
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl">
            The React framework for production. Build modern web applications with ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert mr-2"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="group relative inline-flex items-center justify-center px-8 py-3 font-medium tracking-wide text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Learn</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Learn Next.js through interactive tutorials
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Image
                  aria-hidden
                  src="/window.svg"
                  alt="Window icon"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Examples</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Explore real-world examples
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                <Image
                  aria-hidden
                  src="/globe.svg"
                  alt="Globe icon"
                  width={24}
                  height={24}
                  className="dark:invert"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Find in-depth documentation
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}