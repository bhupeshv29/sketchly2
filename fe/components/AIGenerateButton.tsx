"use client"

import { Game } from "@/render/Game";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket"; // Adjust the path if necessary

export const AIGenerateButton = ({ game }: { game?: Game }) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const socket = useSocket(game?.getRoomId() || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !game) return;

    setIsLoading(true);
    setError("");

    try {
      const url  = process.env.NEXT_PUBLIC_HTTP_URL;
      
      const response = await fetch(`${url}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const shape = await response.json();
      
      game.addShape(shape);

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "draw",
            data: JSON.stringify({ shape }),
            roomId: game.getRoomId(),
          })
        );
      } else {
        console.error("WebSocket is not open. Cannot send data.");
      }

      setPrompt("");
    } catch (error) { 
      setError("Failed to generate shape. Please try again.");
      console.error("Generation error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg text-lg font-semibold hover:bg-blue-600"
        >
          AI
        </button>
      ) : (
        <div className="fixed bottom-16 right-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg z-50 w-64 md:w-80">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your drawing..."
              className="px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 dark:bg-blue-700 dark:hover:bg-blue-800"
              disabled={isLoading || !prompt.trim()}
            >
              {isLoading ? "Generating..." : "AI Generate"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-500 text-sm mt-2 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Close
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
};