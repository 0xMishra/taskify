"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { TaskForm } from "@/components/taskForm";
import { RootState, AppDispatch } from "@/store/store";
import { fetchTasks, updateTask } from "@/store/taskSlice";

export default function EditTaskPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = useParams();
  const task = useSelector((state: RootState) =>
    state.tasks.tasks.find((t) => t._id === id),
  );

  useEffect(() => {
    if (!task) dispatch(fetchTasks());
  }, [task, dispatch]);

  const handleUpdate = (data: {
    title: string;
    description: string;
    status: "pending" | "completed" | "in-progress";
  }) => {
    dispatch(updateTask({ _id: id as string, ...data }));
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      {task ? (
        <TaskForm onSubmit={handleUpdate} initialValues={task} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
