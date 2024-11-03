import {Link, useNavigate} from "react-router-dom";
import InputFields from "../components/input_fields";
import CustomButton from "../components/custom_button";
import AppPallete from "../../../../core/theme/app_pallete";
import {ChangeEvent, FormEvent, useEffect} from "react";
import {AppDispatch, RootState} from "../../../../core/service/store/store";
import {useDispatch, useSelector} from "react-redux";
import {resetStatus, setField} from "../redux/reducer/auth_reducer";
import {toast} from "react-toastify";
import {signUpThunk} from "../redux/action/auth_actions";


const SignUpPage = () => {
    const {background, primary, secondary} = AppPallete;
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const {status, email, password, name, error} = useSelector((state: RootState) => state.auth);

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !password || !email) {
            toast.error("All fields are required");
            return;
        }

        const id: string = Date.now().toString();
        dispatch(signUpThunk({id, email, password, name}));
    };

    useEffect(() => {
        if (status === "succeeded") {
            toast.success("Registration successful!");
            dispatch(resetStatus());
            navigate("/");
        } else if (status === "failed" && error) {
            toast.error(error.message);
        }
    }, [status, error, navigate, dispatch]);

    console.log("error", error);
    return (
        <div
            className="h-[100vh] w-[100vw] flex justify-center items-center py-[15px]"
            style={{backgroundColor: background}}
        >
            <div
                className="w-[90%] md:w-[65%] lg:w-[30%] h-fit flex flex-col justify-start items-center space-y-[60px] rounded-[20px] py-[50px] px-[65px]"
                style={{backgroundColor: primary}}
            >
                <h1 className="text-white text-4xl font-extrabold">Sign Up</h1>
                <form
                    onSubmit={onSubmitHandler}
                    className="w-[90%] md:w-[85%] lg:w-[80%] flex flex-col justify-start items-start space-y-[30px] rounded-[20px]"
                >
                    <InputFields
                        label="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setField({
                            field: "name",
                            value: e.target.value
                        }))}
                    />
                    <InputFields
                        label="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setField({
                            field: "email",
                            value: e.target.value
                        }))}
                    />
                    <InputFields
                        label="password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setField({
                            field: "password",
                            value: e.target.value
                        }))}
                    />
                    <p
                        className="text-white text-center text-sm w-full py-[40px]"
                    >
                        Already have an account? <Link to="/sign-in" style={{color: secondary}}>Sign in</Link>
                    </p>
                    <CustomButton buttonText={status === 'loading' ? "Processing..." : "Continue"} type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;