import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type CanvasProps = {
  id: string;
  children?: ReactNode;
};

export default function Canvas({ id, children }: CanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  return (
    <div className={`w-full h-15/16 rounded-md ${isOver ? 'bg-gray-100' : 'bg-gray-200'}`} ref={setNodeRef}>
      {children}
    </div>
  );
}
