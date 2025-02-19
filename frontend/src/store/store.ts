import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const makeStore = () =>
  configureStore({
    reducer: { tasks: taskReducer },
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
