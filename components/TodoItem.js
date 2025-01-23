"use client";

import { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/services/todosApi";

// Define the type for drag-and-drop items
const ItemType = {
  TODO: "todo",
};

export default function TodoItem({ todo, index, moveTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const ref = useRef(null);

  // React DnD hooks for drag
  const [, drag] = useDrag({
    type: ItemType.TODO,
    item: { index },
  });

  // React DnD hooks for drop
  const [, drop] = useDrop({
    accept: ItemType.TODO,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  // Combine drag and drop refs
  drag(drop(ref));

  const handleUpdate = async () => {
    await updateTodo({
      id: todo.id,
      title,
      description,
      completed: todo.completed,
    });
    setIsEditing(false);
  };

  const handleToggleComplete = async () => {
    await updateTodo({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  return (
    <div ref={ref} className='bg-card p-4 rounded-lg shadow-sm border'>
      {isEditing ? (
        <div className='space-y-2'>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task title'
            className='w-full'
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task description'
            className='w-full'
          />
          <div className='flex justify-end space-x-2'>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setIsEditing(false)}
            >
              <X className='h-4 w-4' />
            </Button>
            <Button size='sm' onClick={handleUpdate}>
              <Check className='h-4 w-4' />
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex items-start justify-between'>
          <div className='flex items-start space-x-3'>
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleToggleComplete}
            />
            <div>
              <h3
                className={`font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {title}
              </h3>
              {description && (
                <p className='text-sm text-muted-foreground mt-1'>
                  {description}
                </p>
              )}
            </div>
          </div>
          <div className='flex space-x-2'>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setIsEditing(true)}
            >
              <Pencil className='h-4 w-4' />
            </Button>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
