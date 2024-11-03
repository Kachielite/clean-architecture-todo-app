import {NoParams, UseCase} from "../../../../core/use_case/use_case";
import {User} from "../entity/user";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";
import {AuthRepository} from "../repository/auth_repository";

export class GetCurrentUserUseCase implements UseCase<User, NoParams> {
    constructor(private authRepository: AuthRepository) {
    }

    async execute(params: NoParams): Promise<Either<Failure, User>> {
        return await this.authRepository.getCurrent()
    }
}