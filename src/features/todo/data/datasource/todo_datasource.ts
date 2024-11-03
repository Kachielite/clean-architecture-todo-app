import {TodoModel} from "../model/todo_model";
import {COLLECTION_ID, DATABASE_ID} from "../../../../core/secrets/secrets";
import {Databases, ID} from "appwrite";
import {ServerException} from "../../../../core/error/server_expection";

export interface TodoDatasource {
    getTodos(): Promise<TodoModel[]>;

    addTodo(todo: TodoModel): Promise<TodoModel>;

    updateTodo(todo: TodoModel): Promise<TodoModel>;

    deleteTodo(id: string): Promise<string>;
}

export class TodoDatasourceImpl implements TodoDatasource {
    constructor(private database: Databases) {
    }

    async addTodo(todo: TodoModel): Promise<TodoModel> {
        try {
            if (DATABASE_ID && COLLECTION_ID) {
                const response = await this.database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), TodoModel.toJson(todo));
                return TodoModel.fromJson(response);
            }
            throw new ServerException("Database or Collection ID is missing");
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }

    async deleteTodo(id: string): Promise<string> {
        try {
            if (DATABASE_ID && COLLECTION_ID) {
                await this.database.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
                return 'Todo deleted successfully';
            }
            throw new ServerException("Database or Collection ID is missing");

        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }

    async getTodos(): Promise<TodoModel[]> {
        try {
            if (DATABASE_ID && COLLECTION_ID) {
                const response = await this.database.listDocuments(DATABASE_ID, COLLECTION_ID);
                return response.documents.map((doc) => TodoModel.fromJson(doc));
            }
            throw new ServerException("Database or Collection ID is missing");
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }

    async updateTodo(todo: TodoModel): Promise<TodoModel> {
        try {
            if (DATABASE_ID && COLLECTION_ID) {
                const response = await this.database.updateDocument(DATABASE_ID, COLLECTION_ID, todo.id, TodoModel.toJson(todo));
                return TodoModel.fromJson(response);
            }
            throw new ServerException("Database or Collection ID is missing");
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }
}