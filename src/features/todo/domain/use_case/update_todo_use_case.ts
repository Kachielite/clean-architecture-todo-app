import {UseCase} from "../../../../core/use_case/use_case";
import {Todo} from "../entity/todo";
import {TodoRepository} from "../repository/todo_repository";
import {Failure} from "../../../../core/error/failure";
import {Either} from "fp-ts/Either";

export class UpdateTodoUseCaseParams {
    constructor(public id: string, public title: string, public isCompleted: boolean) {
    }
}

export class UpdateTodoUseCase extends UseCase<Todo, UpdateTodoUseCaseParams> {
    constructor(private todoRepository: TodoRepository) {
        super();
    }

    async execute(params: UpdateTodoUseCaseParams): Promise<Either<Failure, Todo>> {
        const todo = new Todo(
            params.id,
            params.title,
            params.isCompleted
        );

        return await this.todoRepository.update(todo);
    }
}