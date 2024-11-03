import {createAsyncThunk} from "@reduxjs/toolkit";
import {TodoRepositoryImpl} from "../../../data/repository/todo_repository_impl";
import {TodoDatasourceImpl} from "../../../data/datasource/todo_datasource";
import {AddTodoParams, CreateTodoUseCase} from "../../../domain/use_case/create_todo_use_case";
import {GetTodosUseCase} from "../../../domain/use_case/get_todos_use_case";
import {DeleteTodoParam, DeleteTodoUseCase} from "../../../domain/use_case/delete_todo_use_case";
import {UpdateTodoUseCase, UpdateTodoUseCaseParams} from "../../../domain/use_case/update_todo_use_case";
import {Todo} from "../../../domain/entity/todo";
import {NoParams} from "../../../../../core/use_case/use_case";
import {Failure} from "../../../../../core/error/failure";
import {Either, fold} from "fp-ts/Either";
import {database} from "../../../../../core/service/appwrite/appwrite";

const repository = new TodoRepositoryImpl(new TodoDatasourceImpl(database));
const createTodoUseCase = new CreateTodoUseCase(repository);
const getTodosUseCase = new GetTodosUseCase(repository);
const deleteTodoUseCase = new DeleteTodoUseCase(repository);
const updateTodoUseCase = new UpdateTodoUseCase(repository);

const createTodoThunk = createAsyncThunk<Todo, Todo, { rejectValue: Failure }>(
    'todo/createTodo',
    async (todo: Todo, {rejectWithValue}) => {

        const response: Either<Failure, Todo> = await createTodoUseCase.execute(new AddTodoParams(todo.id, todo.title, todo.isCompleted));

        return fold<Failure, Todo, Todo | ReturnType<typeof rejectWithValue>>(
            (failure) => rejectWithValue(failure),
            (todo) => todo
        )(response)
    });

const getTodosThunk = createAsyncThunk<Todo[], void, { rejectValue: Failure }>(
    'todo/getTodos',
    async (_, {rejectWithValue}) => {
        const response: Either<Failure, Todo[]> = await getTodosUseCase.execute(new NoParams());

        return fold<Failure, Todo[], Todo[] | ReturnType<typeof rejectWithValue>>(
            (failure) => rejectWithValue(failure),
            (todos) => todos
        )(response)
    });

const deleteTodoThunk = createAsyncThunk<string, { id: string }, { rejectValue: Failure }>(
    'todo/deleteTodo',
    async ({id}, {rejectWithValue}) => {
        const response: Either<Failure, string> = await deleteTodoUseCase.execute(new DeleteTodoParam(id));

        return fold<Failure, string, string | ReturnType<typeof rejectWithValue>>(
            (failure) => rejectWithValue(failure),
            () => "Task deleted"
        )(response)


    });

const updateTodoThunk = createAsyncThunk<Todo, Todo, { rejectValue: Failure }>(
    'todo/updateTodo',
    async (todo: Todo, {rejectWithValue}) => {

        const response: Either<Failure, Todo> = await updateTodoUseCase.execute(new UpdateTodoUseCaseParams(todo.id, todo.title, todo.isCompleted));

        return fold<Failure, Todo, Todo | ReturnType<typeof rejectWithValue>>(
            (failure) => rejectWithValue(failure),
            (todo) => todo
        )(response)
    });

export {createTodoThunk, getTodosThunk, deleteTodoThunk, updateTodoThunk};