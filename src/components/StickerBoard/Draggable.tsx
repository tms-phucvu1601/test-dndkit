import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  x: number;
  y: number;
};

export default function Draggable({ id, children, x, y }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
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
    position: "absolute" as const,
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
