import { Task } from "./_components/Task";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-xl">
        <Task />
        <Task />
        <Task />
      </div>
    </main>
  );
}
