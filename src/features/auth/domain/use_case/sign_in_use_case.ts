import {UseCase} from "../../../../core/use_case/use_case";
import {User} from "../entity/user";
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";
import {AuthRepository} from "../repository/auth_repository";


export class SignInUseCaseParams {
    constructor(public email: string, public password: string) {
    }
}

export class SignInUseCase extends UseCase<User, SignInUseCaseParams> {
    constructor(private authRepository: AuthRepository) {
        super();
    }

    async execute(params: SignInUseCaseParams): Promise<Either<Failure, User>> {
        return await this.authRepository.signInWithEmailAndPassword(params.email, params.password);
    }
}