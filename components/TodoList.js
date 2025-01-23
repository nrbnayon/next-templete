"use client";

import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useGetTodosQuery } from "@/redux/services/todosApi";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

// Constants for drag types
const ItemTypes = {
  TODO: "TODO",
};

export default function TodoList() {
  const { data: todos = [], isLoading, error } = useGetTodosQuery();
  const filter = useSelector((state) => state.todos.filter);
  const [localTodos, setLocalTodos] = useState(todos);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500 p-4'>
        Error loading todos: {error.message}
      </div>
    );
  }

  const filteredTodos = localTodos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  // Handle drag and drop logic
  const moveTodo = (dragIndex, hoverIndex) => {
    const updatedTodos = [...localTodos];
    const [removed] = updatedTodos.splice(dragIndex, 1);
    updatedTodos.splice(hoverIndex, 0, removed);
    setLocalTodos(updatedTodos);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='space-y-4'>
        {filteredTodos.map((todo, index) => (
          <DraggableTodo
            key={todo.id}
            todo={todo}
            index={index}
            moveTodo={moveTodo}
          />
        ))}
      </div>
    </DndProvider>
  );
}

function DraggableTodo({ todo, index, moveTodo }) {
  const ref = useState(null);

  // Drag logic
  const [, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
  });

  // Drop logic
  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (item) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className='p-4 border rounded shadow-md bg-white'>
      <TodoItem todo={todo} />
    </div>
  );
}
