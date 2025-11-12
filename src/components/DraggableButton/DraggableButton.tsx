import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import BasicButton from "./BasicButton";

type ButtonData = {
  id: string;
  x: number;
  y: number;
  content: string;
};

export default function DraggableButton() {
  const [basicButtons, setBasicButtons] = useState<ButtonData[]>([
    { id: "basic-button", x: 100, y: 100, content: "BasicButton" },
    { id: "btn2", x: 300, y: 200, content: "Button 2" },
  ]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, delta } = e;
    setBasicButtons((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? { ...item, x: item.x + delta.x, y: item.y + delta.y }
          : item
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-screen h-screen overflow-hidden">
        {basicButtons.map((btn) => (
          <BasicButton key={btn.id} id={btn.id} x={btn.x} y={btn.y}>
            {btn.content}
          </BasicButton>
        ))}
      </div>
    </DndContext>
  );
}