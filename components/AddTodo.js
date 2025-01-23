'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useAddTodoMutation } from '@/redux/services/todosApi';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTodo({
      title,
      description,
      completed: false,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="w-full"
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description (optional)"
        className="w-full"
      />
      <Button type="submit" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
}