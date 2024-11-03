import {AuthRepository} from "../../domain/repository/auth_repository";
import {User} from "../../domain/entity/user";
import {Either, left, right} from "fp-ts/Either";
import {Failure} from "../../../../core/error/failure";
import {AuthDatasource} from "../datasource/auth_datasource";


export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDatasource: AuthDatasource) {
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<Either<Failure, User>> {
        try {
            const user = await this.authDatasource.signInWithEmailAndPassword(email, password);
            return right(user);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

    async signUpWithEmailAndPassword(id: string, email: string, password: string, name: string): Promise<Either<Failure, User>> {
        try {
            const user = await this.authDatasource.signUpWithEmailAndPassword(id, name, email, password);
            return right(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

    async getCurrent(): Promise<Either<Failure, User>> {
        try {
            const user = await this.authDatasource.getCurrentUser();
            return right(user);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            return left(new Failure(errorMessage));
        }
    }

}