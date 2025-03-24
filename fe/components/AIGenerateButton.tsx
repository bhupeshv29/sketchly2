"use client"

import { Game } from "@/render/Game";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket"; // Adjust the path if necessary

export const AIGenerateButton = ({ game }: { game?: Game }) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const socket = useSocket(game?.getRoomId() || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !game) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/generate`, {
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
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your drawing..."
          className="px-4 py-2 border rounded"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "Generating..." : "AI Generate"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};