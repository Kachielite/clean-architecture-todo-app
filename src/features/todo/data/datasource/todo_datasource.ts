import {TodoModel} from "../model/todo_model";
import {COLLECTION_ID, DATABASE_ID} from "../../../../core/secrets/secrets";
import {Databases} from "appwrite";
import {ServerException} from "../../../../core/error/server_expection";

export interface TodoDatasource {
    getTodos(): Promise<TodoModel[]>;

    addTodo(todo: TodoModel): Promise<TodoModel>;

    updateTodo(todo: TodoModel): Promise<TodoModel>;

    deleteTodo(id: string): Promise<string>;
}

export class TodoDatasourceImpl implements TodoDatasource {
    databaseID: string = DATABASE_ID as string;
    collectionID: string = COLLECTION_ID as string;

    constructor(private database: Databases) {
    }

    async addTodo(todo: TodoModel): Promise<TodoModel> {
        try {
            const response = await this.database.createDocument(this.databaseID, this.collectionID, todo.id, TodoModel.toJson(todo));
            return TodoModel.fromJson(response);
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
            await this.database.deleteDocument(this.databaseID, this.collectionID, id);
            return 'Todo deleted successfully';
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
            const response = await this.database.listDocuments(this.databaseID, this.collectionID);
            console.log("response", response);
            return response.documents.map((doc) => TodoModel.fromJson(doc));
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
            const response = await this.database.updateDocument(this.databaseID, this.collectionID, todo.id, TodoModel.toJson(todo));
            return TodoModel.fromJson(response);
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }
}