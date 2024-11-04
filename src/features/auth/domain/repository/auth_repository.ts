import {User} from '../entity/user'
import {Either} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";

export interface AuthRepository {

    signInWithEmailAndPassword(email: string, password: string): Promise<Either<Failure, User>>;

    signUpWithEmailAndPassword(id: string, email: string, password: string, name: string): Promise<Either<Failure, User>>;

    getCurrent(): Promise<Either<Failure, User>>;
}