import {configureStore} from "@reduxjs/toolkit";
import todoReducer from "../../../features/todo/presentation/redux/reducer/todo_reducer";
import authReducer from "../../../features/auth/presentation/redux/reducer/auth_reducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;