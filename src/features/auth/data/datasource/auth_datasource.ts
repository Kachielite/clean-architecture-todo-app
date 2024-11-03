import {UserModel} from "../model/user_model";
import {ServerException} from "../../../../core/error/server_expection";
import {Account} from "appwrite";


export interface AuthDatasource {
    signUpWithEmailAndPassword(userId: string, name: string, email: string, password: string): Promise<UserModel>;

    signInWithEmailAndPassword(email: string, password: string): Promise<UserModel>;

    getCurrentUser(): Promise<UserModel>;
}

export class AuthDatasourceImpl implements AuthDatasource {
    constructor(private account: Account) {
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<UserModel> {
        try {
            const response = await this.account.createEmailPasswordSession(email, password);
            if (!response.$id) {
                throw new ServerException('User is null');
            }
            return UserModel.fromJSON(response);
        } catch (e) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }

    async signUpWithEmailAndPassword(userId: string, name: string, email: string, password: string): Promise<UserModel> {
        try {
            const response = await this.account.create(userId, email, password, name);
            if (!response.$id) {
                throw new ServerException('User is null');
            }
            return UserModel.fromJSON(response);
        } catch (e) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }

    async getCurrentUser(): Promise<UserModel> {
        try {
            const response = await this.account.get();
            if (!response.$id) {
                throw new ServerException('User is not logged in');
            }
            return UserModel.fromJSON(response);
        } catch (e) {
            if (e instanceof Error) {
                throw new ServerException(e.message);
            } else {
                throw new ServerException("An unknown error occurred");
            }
        }
    }
}