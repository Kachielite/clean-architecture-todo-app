import {UseCase} from "../../../../core/use_case/use_case";
import {User} from "../entity/user";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";
import {AuthRepository} from "../repository/auth_repository";

export class SignUpUseCaseParams {
    constructor(public id: string, public email: string, public password: string, public name: string) {
    }
}

export class SignUpUseCase extends UseCase<User, SignUpUseCaseParams> {
    constructor(private authRepository: AuthRepository) {
        super();
    }

    async execute(params: SignUpUseCaseParams): Promise<Either<Failure, User>> {
        return await this.authRepository.signUpWithEmailAndPassword(params.id, params.email, params.password, params.name,)
    }

}