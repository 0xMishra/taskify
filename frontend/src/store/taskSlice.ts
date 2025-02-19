import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL!}/tasks`;

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed" | "in-progress";
};

type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<Task[]>(API_URL, { withCredentials: true });
  return response.data;
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "_id">) => {
    const response = await axios.post<Task>(API_URL, task, {
      withCredentials: true,
    });
    return response.data;
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task) => {
    const response = await axios.put<Task>(`${API_URL}/${task._id}`, task, {
      withCredentials: true,
    });
    return response.data;
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (_id: string) => {
    await axios.delete(`${API_URL}/${_id}`, { withCredentials: true });
    return _id;
  },
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id,
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
