import {UseCase} from "../../../../core/use_case/use_case";
import {TodoRepository} from "../repository/todo_repository";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";

export class DeleteTodoParam {
    constructor(public id: string) {
    }
}

export class DeleteTodoUseCase extends UseCase<string, DeleteTodoParam> {
    constructor(private todoRepository: TodoRepository) {
        super();
    }

    async execute(params: DeleteTodoParam): Promise<Either<Failure, string>> {
        return await this.todoRepository.delete(params.id);
    }
}