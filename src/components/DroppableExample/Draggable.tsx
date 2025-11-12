import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

type DraggableProp = {
  id: string;
  children: ReactNode;
};

export default function Draggable(props: DraggableProp) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = {
    // Outputs `translate3d(x, y, scaleX, scaleY)`
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      className="relative bg-amber-400 rounded-md px-4 py-2 border-2 border-amber-600 z-50 cursor-grab"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </button>
  );
}
