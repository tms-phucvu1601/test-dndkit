import {useState} from 'react';
import {DndContext, type UniqueIdentifier} from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';

export function Example() {
  const [parent, setParent] = useState<UniqueIdentifier |null>(null);
  const draggable = (
    <Draggable id="draggable">
      Go ahead, drag me.
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='h-10'>
        {!parent ? draggable : null}
      </div>
      <div className='flex gap-4'>
        <Droppable id="cool">
          {parent === "cool" ? draggable : 'Cool color'}
        </Droppable>
        <Droppable id="hot">
          {parent === "hot" ? draggable : 'Hot color'}
        </Droppable>        
      </div>
    </DndContext>
  );

  function handleDragEnd({over}: {over: {id: UniqueIdentifier} | null}) {
    setParent(over ? over.id : null);
  }
}
  