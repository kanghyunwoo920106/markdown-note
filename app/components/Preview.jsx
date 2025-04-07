"use client";
import { marked } from "marked";

export default function Preview({ markdown }) {
  return (
    <div
      className="prose max-w-full p-4 dark:prose-invert overflow-y-auto"
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    />
  );
}