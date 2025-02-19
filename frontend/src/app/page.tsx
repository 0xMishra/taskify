"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "@/store/taskSlice";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">Create Task</Link>
        </Button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task._id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className={`font-semibold ${task.status === "completed" ? "text-green-600" : task.status === "in-progress" ? "text-yellow-600" : "text-red-600"}`}
              >
                {task.status}
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/tasks/${task._id}`}>View</Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => dispatch(deleteTask(task._id))}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
