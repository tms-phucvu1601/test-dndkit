import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type DroppableProp = {
  id: string;
  children: ReactNode;
};

export default function Droppable(props: DroppableProp) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div
      className={`w-[400px] aspect-square bg-gray-200 rounded-2xl border-2  flex justify-center items-center ${
        isOver ? "border-4 border-green-300" : "border-gray-700"
      }`}
      ref={setNodeRef}
      style={style}
    >
      {props.children}
    </div>
  );
}
