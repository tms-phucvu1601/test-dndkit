import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

export type BasicButtonProps = {
  id: string;
  x: number;
  y: number;
  children: ReactNode;
};

export default function BasicButton({ id, x, y, children }: BasicButtonProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = {
    transform: transform
      ? CSS.Translate.toString({
          x: x + transform.x,
          y: y + transform.y,
          scaleX: 1,
          scaleY: 1,
        })
      : CSS.Translate.toString({ x, y, scaleX: 1, scaleY: 1 }),
    transition: isDragging ? "none" : "transform 0.2s ease",
  };

  return (
    <button
      className={`px-3 py-2 bg-black text-white text-xl font-bold rounded-md cursor-grab ${
        isDragging ? "shadow-2xl" : ""
      }`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {children}
    </button>
  );
}
