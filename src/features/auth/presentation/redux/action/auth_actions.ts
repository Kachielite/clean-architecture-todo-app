import {AuthRepositoryImpl} from "../../../data/repository/auth_repository_impl";
import {AuthDatasourceImpl} from "../../../data/datasource/auth_datasource";
import {SignInUseCase, SignInUseCaseParams} from "../../../domain/use_case/sign_in_use_case";
import {SignUpUseCase, SignUpUseCaseParams} from "../../../domain/use_case/sign_up_use_case";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Failure} from "../../../../../core/error/failure";
import {User} from "../../../domain/entity/user";
import {Either, fold} from "fp-ts/Either";
import {account} from "../../../../../core/service/appwrite/appwrite";
import {GetCurrentUserUseCase} from "../../../domain/use_case/get_current_user_use_case";
import {NoParams} from "../../../../../core/use_case/use_case";


const repository = new AuthRepositoryImpl(new AuthDatasourceImpl(account));
const signInUseCase = new SignInUseCase(repository);
const signUpUseCase = new SignUpUseCase(repository);
const getCurrentUserUseCase = new GetCurrentUserUseCase(repository);


export const signInThunk = createAsyncThunk<User, { email: string; password: string }, {
    rejectValue: Failure
}>('auth/signIn', async ({email, password}, {rejectWithValue}) => {
    const response: Either<Failure, User> = await signInUseCase.execute(new SignInUseCaseParams(email, password));

    return fold<Failure, User, User | ReturnType<typeof rejectWithValue>>(
        (failure) => rejectWithValue(failure),
        (user) => user
    )(response);

});

export const signUpThunk = createAsyncThunk<User, { id: string, email: string, password: string, name: string }, {
    rejectValue: Failure
}>('auth/signUp', async ({id, email, password, name}, {rejectWithValue}) => {
    const response: Either<Failure, User> = await signUpUseCase.execute(new SignUpUseCaseParams(id, email, name, password));

    return fold<Failure, User, User | ReturnType<typeof rejectWithValue>>(
        (failure) => rejectWithValue(failure),
        (user) => user
    )(response);
})

export const getUserThunk = createAsyncThunk<User, void, {
    rejectValue: Failure
}>('auth/getUser', async (_, {rejectWithValue}) => {
    const response: Either<Failure, User> = await getCurrentUserUseCase.execute(new NoParams());

    return fold<Failure, User, User | ReturnType<typeof rejectWithValue>>(
        (failure) => rejectWithValue(failure),
        (user) => user
    )(response)
})