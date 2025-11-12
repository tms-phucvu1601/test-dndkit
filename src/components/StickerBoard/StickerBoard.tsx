import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Sticker from "./Sticker";
import Canvas from "./Canvas";

export default function StickerBoard() {
  const [stickers, setStickers] = useState([
    { id: "a", x: 0, y: 0, text: "🌸 Flower", inCanvas: false },
    { id: "b", x: 0, y: 0, text: "🔥 Fire" , inCanvas: false },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta, active, over } = event;
    if(over?.id!=="canvas") return;
    setStickers((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? { ...item, x: item.x + delta.x, y: item.y + delta.y, inCanvas: true }
          : item
      )
    );
  };

  return (
    <div className="flex h-[800px] gap-2 m-2">
      <DndContext onDragEnd={handleDragEnd}>
<div className="border-2 rounded-md p-4">
  <div>Các stickers</div>
  <div className="flex flex-col gap-2 relative">
    {stickers
      .filter(s => !s.inCanvas) // stickers chưa vào canvas
      .map(item => (
        <Sticker key={item.id} {...item} >{item.text}</Sticker>
      ))}
  </div>
</div>

<div className="flex-1 border-2 rounded-md p-4 relative">
  <div>Canvas</div>
  <Canvas id="canvas">
    {stickers
      .filter(s => s.inCanvas) // stickers đã vào canvas
      .map(item => (
        <Sticker key={item.id} {...item} >{item.text}</Sticker>
      ))}
  </Canvas>
</div>

      </DndContext>
    </div>
  );
}
