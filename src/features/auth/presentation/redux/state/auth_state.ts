import {User} from "../../../domain/entity/user";
import {Failure} from "../../../../../core/error/failure";


export interface AuthState {
    email: string;
    password: string;
    name: string;
    user: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: Failure | null
}

export const initialAuthState: AuthState = {
    email: "",
    password: "",
    name: "",
    user: null,
    status: 'idle',
    error: null,
}