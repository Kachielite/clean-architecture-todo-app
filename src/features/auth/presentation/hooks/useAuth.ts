import {ChangeEvent, useEffect, useState} from "react";
import {Failure} from "../../../../core/error/failure";
import {getCurrentUserUseCase, signInUseCase, signUpUseCase} from "../../../../init_dependencies";
import {SignInUseCaseParams} from "../../domain/use_case/sign_in_use_case";
import {fold} from 'fp-ts/Either'
import {User} from "../../domain/entity/user";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {SignUpUseCaseParams} from "../../domain/use_case/sign_up_use_case";
import {NoParams} from "../../../../core/use_case/use_case";
import {ID} from "appwrite";

const ERROR = "An unknown error has occurred";
const SIGN_IN_SUCCESS = "Welcome back";
const SIGN_UP_SUCCESS = "Welcome to the Todo App. The Admin will activate your account to give you full access";

const useAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [userData, setUserData] = useState({name: '', email: '', password: ''});

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id;
        const value = e.target.value;

        switch (id) {
            case 'email':
                setUserData({...userData, email: value});
                break;
            case 'password':
                setUserData({...userData, password: value});
                break;
            case 'name':
                setUserData({...userData, name: value});
                break;
        }
    }

    const onSignInHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await signInUseCase.execute(new SignInUseCaseParams(userData.email, userData.password));

        fold<Failure, User, void>(
            (failure) => {
                setIsLoading(false);
                toast.error(failure.message || ERROR);
            },
            (user) => {
                setUser(user);
                setIsLoading(false);
                toast.success(SIGN_IN_SUCCESS, {
                    toastId: "auth-success-sign-in", // unique ID to prevent duplicates
                });
                navigate("/");
            }
        )(response);
    };

    const onSignUpHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const id = ID.unique();
        const response = await signUpUseCase.execute(new SignUpUseCaseParams(id, userData.email, userData.password, userData.name));

        fold<Failure, User, void>(
            (failure) => {
                setIsLoading(false);
                toast.error(failure.message || ERROR);
            },
            (user) => {
                setUser(user);
                setIsLoading(false);
                toast.success(SIGN_UP_SUCCESS, {
                    toastId: "auth-success-sign-up", // unique ID to prevent duplicates
                });
                navigate("/sign-in");
            }
        )(response);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            (async () => {
                setIsCheckingAuth(true);

                const response = await getCurrentUserUseCase.execute(new NoParams());

                fold<Failure, User, void>(
                    (failure) => {
                        setIsCheckingAuth(false);
                        navigate("/sign-in");
                    },
                    (user) => {
                        setUser(user);
                        setIsCheckingAuth(false);
                        navigate("/");
                    }
                )(response);
            })();
        }
    }, [location.pathname, navigate, setIsCheckingAuth, setUser]);


    return {user, onSignInHandler, onSignUpHandler, onChangeHandler, isLoading, isCheckingAuth, userData};
}

export default useAuth;
