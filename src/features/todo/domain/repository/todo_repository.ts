import {Todo} from "../entity/todo";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";

export interface TodoRepository {
    create(todo: Todo): Promise<Either<Failure, Todo>>;

    delete(id: string): Promise<Either<Failure, string>>;

    getAll(): Promise<Either<Failure, Todo[]>>;

    update(todo: Todo): Promise<Either<Failure, Todo>>;
}