import {useLocation, useNavigate} from "react-router-dom";
import {AppDispatch, RootState} from "../../../../core/service/store/store";
import {useAppDispatch, useAppSelector} from "../../../../core/service/store/hook";
import {useEffect} from "react";
import {getUserThunk} from "../redux/action/auth_actions";
import {toast} from "react-toastify";

const useCheckAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();
    const {status} = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (location.pathname === "/") {
            if (status === "idle") {
                dispatch(getUserThunk());
            } else if (status === "failed") {
                toast.error("Authentication failed. Redirecting to sign-in.", {
                    toastId: "auth-failed", // unique ID to prevent duplicates
                });
                navigate("/sign-in");
            } else if (status === "succeeded") {
                toast.success("Welcome back!", {
                    toastId: "auth-success", // unique ID to prevent duplicates
                });
                navigate("/");
            }
        }
    }, [status, dispatch, navigate, location]);

    return {status};
}

export default useCheckAuth;