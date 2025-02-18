"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const [text, setText] = useState("");
  const createTodo = useMutation(api.todos.createTodo);
  const todos = useQuery(api.todos.getTodos);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Value:", text);
    // Additional logic can go here (e.g., API call, updating a list)
    createTodo({
      text
    })

    setText("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div className="p-2 border-b" key={todo._id}>
              {todo.text}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos available.</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter something..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </main>
    </div>
  );
}
