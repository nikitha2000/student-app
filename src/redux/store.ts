import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./classReducer";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const store = configureStore({ reducer: rootReducer });

export default store;
