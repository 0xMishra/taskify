"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTasks } from "@/store/taskSlice";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TaskDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t._id === id),
  );

  useEffect(() => {
    if (!task) dispatch(fetchTasks());
  }, [task, dispatch]);

  if (!task) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mt-2">{task.description}</p>
          <p
            className={`mt-4 font-semibold ${task.status === "completed" ? "text-green-600" : task.status === "in-progress" ? "text-yellow-600" : "text-red-600"}`}
          >
            Status: {task.status}
          </p>
          <div className="mt-4 flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/">Back</Link>
            </Button>
            <Button asChild>
              <Link href={`/tasks/edit/${task._id}`}>Edit Task</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
