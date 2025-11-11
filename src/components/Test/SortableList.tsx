import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Item {
  id: string;
  text: string;
}

// Dữ liệu ban đầu
const initialItems: Item[] = [
  { id: '1', text: 'Học React' },
  { id: '2', text: 'Học TypeScript' },
  { id: '3', text: 'Học DnD Kit' },
];

// Component: 1 item có thể kéo
function SortableItem({ item }: { item: Item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform), // Di chuyển mượt khi kéo
    transition, // Hiệu ứng khi thả
    opacity: isDragging ? 0.5 : 1,
    padding: '16px',
    margin: '8px 0',
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}         // Gắn ref để dnd-kit biết đây là item
      style={style}
      {...attributes}          // ARIA, accessibility
      {...listeners}           // Bắt sự kiện kéo
    >
      {item.text}
    </div>
  );
}

// Component chính
export default function SortableList() {
  const [items, setItems] = useState(initialItems);

  // Cấu hình sensors: chuột + bàn phím
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Khi thả xong
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex); // Đổi chỗ
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter} // Xác định "thả vào đâu"
      onDragEnd={handleDragEnd}
    >
      {/* Vùng cho phép sắp xếp */}
      <SortableContext
        items={items.map((i) => i.id)} // Chỉ cần danh sách ID
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
}