import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import Nav from "./components/Nav";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main>
      <div>
        <Nav />
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
