// StickerBoard.tsx
"use client";

import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable";

export default function StickerBoard() {
  const [items, setItems] = useState([
    { id: "a", x: 50, y: 50, text: "🌸 Hello" },
    { id: "b", x: 200, y: 120, text: "🔥 Drag me" },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active } = event;
    setItems((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? { ...item, x: item.x + delta.x, y: item.y + delta.y }
          : item
      )
    );
  };

  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        {items.map((item) => (
          <Draggable key={item.id} id={item.id} x={item.x} y={item.y}>
            {item.text}
          </Draggable>
        ))}
      </DndContext>
    </div>
  );
}
