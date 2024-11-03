import {Todo} from "../../../domain/entity/todo";

export interface TodoState{
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const initialTodoState: TodoState = {
    todos: [],
    status: 'idle',
    error: null
}