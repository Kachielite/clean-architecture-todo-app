import {NoParams, UseCase} from "../../../../core/use_case/use_case";
import {Todo} from "../entity/todo";
import {TodoRepository} from "../repository/todo_repository";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";

export class GetTodosUseCase extends UseCase<Todo[], NoParams> {
    constructor(private todoRepository: TodoRepository) {
        super();
    }

    async execute(params: NoParams): Promise<Either<Failure, Todo[]>> {
        return await this.todoRepository.getAll();
    }
}