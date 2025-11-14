import StickerBoard from "./components/StickerBoard/StickerBoard";
import DroppableExample from "./components/DroppableExample/DroppableExample";
import { NavLink, Route, Routes } from "react-router";
import DraggableButton from "./components/DraggableButton/DraggableButton";

const MENU_CONTENTS = [
  {
    name: "Sticker board",
    path: "sticker_board",
  },
  {
    name: "Drop",
    path: "droppable_example",
  },
  {
    name: "Drag",
    path: "draggable_button",
  },
];

export default function App() {
  return (
    <>
      <div className="flex px-6 py-4 mb-8 shadow-md gap-2">
        {MENU_CONTENTS.map(({ name, path }) => (
          <NavLink
            to={path}
            key={path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${isActive ? "bg-gray-200" : "bg-gray-50"}`
            }
          >
            {name}
          </NavLink>
        ))}
      </div>
      <Routes>
        <Route path={"sticker_board"} element={<StickerBoard />} />
        <Route path={"droppable_example"} element={<DroppableExample />} />
        <Route path={"draggable_button"} element={<DraggableButton />} />
      </Routes>
    </>
  );
}
