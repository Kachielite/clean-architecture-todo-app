import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createTodoThunk, getTodosThunk } from "../redux/action/todo_actions";
import { Todo } from "../../domain/entity/todo";
import {AppDispatch} from "../../../../core/service/store/store";
import {RootState} from "../../../../core/service/store/store";


const useTodo = () => {
    const dispatch: AppDispatch = useDispatch();
    const { todos, status, error } = useSelector((state: RootState) => state.todo);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(getTodosThunk());
        }
    }, [status, dispatch]);

    const addTodo = () => {
        const newTodo: Todo = { id: Date.now().toString(), title: title, isCompleted: false};
        dispatch(createTodoThunk(newTodo));
    };

    return { todos, status, error, addTodo, setTitle };
};

export default useTodo;