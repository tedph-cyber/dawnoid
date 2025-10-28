"use client";
import { FaWhatsapp } from "react-icons/fa6";

export default function ChatBox() {
  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
      <button
        aria-label="Open chat"
        title="Chat"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center animate-[bounce_1.8s_infinite] hover:scale-105 transition-transform"
      >
        <a
          href="https://wa.me/c/2347080982579"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="w-5 h-5" />
        </a>
      </button>
    </div>
  );
}
