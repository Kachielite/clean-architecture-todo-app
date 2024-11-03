import {TodoRepository} from "../../domain/repository/todo_repository";
import {Todo} from "../../domain/entity/todo";
import {TodoDatasource} from "../datasource/todo_datasource";
import {Either, left, right} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";

export class TodoRepositoryImpl implements TodoRepository {
    constructor(private todoDatasource: TodoDatasource) {
    }

    async create(todo: Todo): Promise<Either<Failure, Todo>> {
        try {
            const response = await this.todoDatasource.addTodo(todo);
            return right(response);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

    async delete(id: string): Promise<Either<Failure, string>> {
        try {
            const response = await this.todoDatasource.deleteTodo(id);
            return right(response);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

    async getAll(): Promise<Either<Failure, Todo[]>> {
        try {
            const response = await this.todoDatasource.getTodos();
            return right(response);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

    async update(todo: Todo): Promise<Either<Failure, Todo>> {
        try {
            const response = await this.todoDatasource.updateTodo(todo);
            return right(response);
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }
}