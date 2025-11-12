import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type StickerProps = {
  id: string;
  children: ReactNode;
  x: number;
  y: number;
};

export default function Sticker({ id, children, x, y }: StickerProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

const style = {
  position: "absolute" as const,
  left: x,
  top: y,
  transform: transform
    ? CSS.Translate.toString({
        x: transform.x,
        y: transform.y,
        scaleX: 1,
        scaleY: 1,
      })
    : undefined,
  transition: isDragging ? "none" : "transform 0.2s ease",
};


  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-sky-500 text-white px-4 py-2 rounded-xl border-2 border-sky-700 cursor-grab active:cursor-grabbing select-none"
    >
      {children}
    </button>
  );
}
