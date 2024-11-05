import {ChangeEvent, useEffect, useState} from "react";
import {Todo} from "../../domain/entity/todo";
import {createTodoUseCase, deleteTodoUseCase, getTodosUseCase, updateTodoUseCase} from "../../../../init_dependencies";
import {AddTodoParams} from "../../domain/use_case/create_todo_use_case";
import {Either, fold} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";
import {toast} from "react-toastify";
import {UpdateTodoUseCaseParams} from "../../domain/use_case/update_todo_use_case";
import {DeleteTodoParam} from "../../domain/use_case/delete_todo_use_case";
import {NoParams} from "../../../../core/use_case/use_case";
import {ID} from "appwrite";


const useTodo = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const [newTodo, setNewTodo] = useState<Todo | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewTodo({id: ID.unique(), title: value, isCompleted: false})
    }

    const addTodoHandler = async () => {
        const toastId = toast.loading("Submitting todo...");
        if (newTodo && todos) {
            const response = await createTodoUseCase.execute(new AddTodoParams(newTodo.id, newTodo.title, newTodo.isCompleted));

            fold<Failure, Todo, void>(
                (failure) => toast.update(toastId, {
                    render: failure.message,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                }),
                (todo: Todo) => {
                    setTodos([todo, ...todos]);
                    setNewTodo(null);
                    toast.update(toastId, {
                        render: "Todo added successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                    });
                }
            )(response);
        } else {
            toast.error("Please provide a title for the task you want to submit");
        }
    }

    const updateTodoHandler = async (todo: Todo) => {
        todo = {...todo, isCompleted: true};
        const toastId = toast.loading("Updating todo...");
        const response: Either<Failure, Todo> = await updateTodoUseCase.execute(new UpdateTodoUseCaseParams(todo.id, todo.title, todo.isCompleted,));

        fold<Failure, Todo, void>(
            (failure) => toast.update(toastId, {
                render: failure.message,
                type: "error",
                isLoading: false,
                autoClose: 5000
            }),
            (todo: Todo) => {
                setTodos(prevTodos => {
                    if (prevTodos) {
                        return prevTodos.map(t => t.id === todo.id ? {...t, ...todo} : t)
                    }
                    return prevTodos;
                })
                toast.update(toastId, {
                    render: "Todo updated successfully",
                    type: "success",
                    isLoading: false,
                    autoClose: 5000
                });
            }
        )(response)
    }

    const deleteTodoHandler = async (id: string) => {
        const toastId = toast.loading("Deleting todo...");
        const response: Either<Failure, string> = await deleteTodoUseCase.execute(new DeleteTodoParam(id));

        fold<Failure, string, void>(
            (failure) => toast.update(toastId, {
                render: failure.message,
                type: "error",
                isLoading: false,
                autoClose: 5000
            }),
            (res: string) => {
                setTodos(prevTodos => {
                    if (prevTodos) {
                        return prevTodos.filter(t => t.id !== id)
                    } else {
                        return prevTodos;
                    }
                })
                toast.update(toastId, {render: res, type: "success", isLoading: false, autoClose: 5000});
            }
        )(response);
    }

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const response: Either<Failure, Todo[]> = await getTodosUseCase.execute(new NoParams());

            fold<Failure, Todo[], void>(
                (failure) => toast.error(failure.message, {toastId: "fetch_todo_failed"}),
                (todos: Todo[]) => {
                    setTodos(todos)
                }
            )(response);
            setIsLoading(false)
        })()
    }, [])

    return {todos, newTodo, isLoading, addTodoHandler, onBlurHandler, updateTodoHandler, deleteTodoHandler}
}

export default useTodo;