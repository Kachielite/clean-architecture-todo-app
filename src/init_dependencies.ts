import {Account, Client, Databases} from 'appwrite';
import {AuthRepositoryImpl} from "./features/auth/data/repository/auth_repository_impl";
import {AuthDatasourceImpl} from "./features/auth/data/datasource/auth_datasource";
import {SignInUseCase} from "./features/auth/domain/use_case/sign_in_use_case";
import {SignUpUseCase} from "./features/auth/domain/use_case/sign_up_use_case";
import {GetCurrentUserUseCase} from "./features/auth/domain/use_case/get_current_user_use_case";
import {ENDPOINT, PROJECT_ID} from "./core/secrets/secrets";
import {TodoRepositoryImpl} from "./features/todo/data/repository/todo_repository_impl";
import {TodoDatasourceImpl} from "./features/todo/data/datasource/todo_datasource";
import {CreateTodoUseCase} from "./features/todo/domain/use_case/create_todo_use_case";
import {GetTodosUseCase} from "./features/todo/domain/use_case/get_todos_use_case";
import {DeleteTodoUseCase} from "./features/todo/domain/use_case/delete_todo_use_case";
import {UpdateTodoUseCase} from "./features/todo/domain/use_case/update_todo_use_case";

const client = new Client();
client
    .setEndpoint(ENDPOINT as string)
    .setProject(PROJECT_ID as string)
;


const account = new Account(client);
const database = new Databases(client);

// Auth Dependency Injection
const authRepository = new AuthRepositoryImpl(new AuthDatasourceImpl(account));
export const signInUseCase = new SignInUseCase(authRepository);
export const signUpUseCase = new SignUpUseCase(authRepository);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepository);

// Todo Dependency Injection
const todoRepository = new TodoRepositoryImpl(new TodoDatasourceImpl(database));
const createTodoUseCase = new CreateTodoUseCase(todoRepository);
const getTodosUseCase = new GetTodosUseCase(todoRepository);
const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
const updateTodoUseCase = new UpdateTodoUseCase(todoRepository);