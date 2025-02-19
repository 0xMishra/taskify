"use client";
import { TaskForm } from "@/components/taskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppDispatch } from "@/store/store";
import { addTask } from "@/store/taskSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function NewTaskPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleCreateTask = (values: {
    title: string;
    description: string;
    status: "pending" | "completed" | "in-progress";
  }) => {
    dispatch(addTask(values));
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleCreateTask}
            initialValues={{ title: "", description: "", status: "pending" }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
