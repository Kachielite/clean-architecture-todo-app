import {createReducer} from "@reduxjs/toolkit";
import {initialTodoState, TodoState} from "../state/todo_state";
import {createTodoThunk, deleteTodoThunk, getTodosThunk, updateTodoThunk} from "../action/todo_actions";

// Helper function to handle pending state
const handlePending = (state: TodoState) => {
    state.status = 'loading';
    state.error = null;
};

// Helper function to handle rejected state
const handleRejected = (state: TodoState, action: any, errorMessage: string) => {
    state.status = 'failed';
    state.error = action.error.message || errorMessage;
};

const todoReducer = createReducer(initialTodoState, (builder) => {
    // Map each thunk action to specific cases using the helper functions
    builder
        // Create Todo
        .addCase(createTodoThunk.pending, handlePending)
        .addCase(createTodoThunk.fulfilled, (state: TodoState, action) => {
            state.status = 'succeeded';
            state.todos.push(action.payload);
        })
        .addCase(createTodoThunk.rejected, (state: TodoState, action) =>
            handleRejected(state, action, 'Failed to create todo')
        )

        // Get Todos
        .addCase(getTodosThunk.pending, handlePending)
        .addCase(getTodosThunk.fulfilled, (state: TodoState, action) => {
            state.status = 'succeeded';
            state.todos = action.payload;
        })
        .addCase(getTodosThunk.rejected, (state: TodoState, action) =>
            handleRejected(state, action, 'Failed to fetch todos')
        )

        // Delete Todo
        .addCase(deleteTodoThunk.pending, handlePending)
        .addCase(deleteTodoThunk.fulfilled, (state: TodoState, action) => {
            state.status = 'succeeded';
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        })
        .addCase(deleteTodoThunk.rejected, (state: TodoState, action) =>
            handleRejected(state, action, 'Failed to delete todo')
        )

        // Update Todo
        .addCase(updateTodoThunk.pending, handlePending)
        .addCase(updateTodoThunk.fulfilled, (state: TodoState, action) => {
            state.status = 'succeeded';
            state.todos = state.todos.map((todo) =>
                todo.id === action.payload.id ? action.payload : todo
            );
        })
        .addCase(updateTodoThunk.rejected, (state: TodoState, action) =>
            handleRejected(state, action, 'Failed to update todo')
        );
});

export default todoReducer;
