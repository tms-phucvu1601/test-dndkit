import {useState} from 'react';
import {DndContext, type DragEndEvent, type UniqueIdentifier} from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

export default function DroppableExample() {
  const [parentId, setParentId] = useState<UniqueIdentifier |null>(null);
  const draggable = (
    <Draggable id="draggable">
      Go ahead, drag me.
    </Draggable>
  );

  function handleDragEnd(e : DragEndEvent) {
    const { over } = e;
    setParentId(over ? over.id : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='h-16'>
        {!parentId ? draggable : null}
      </div>
      <div className='flex gap-4'>
        <Droppable id="cool">
          {parentId === "cool" ? draggable : 'Cool color'}
        </Droppable>
        <Droppable id="hot">
          {parentId === "hot" ? draggable : 'Hot color'}
        </Droppable>        
      </div>
    </DndContext>
  );
}
  