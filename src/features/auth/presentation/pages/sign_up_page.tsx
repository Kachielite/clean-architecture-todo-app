import {Link} from "react-router-dom";
import InputFields from "../components/input_fields";
import CustomButton from "../components/custom_button";
import AppPallete from "../../../../core/theme/app_pallete";
import useAuth from "../hooks/useAuth";


const SignUpPage = () => {
    const {background, primary, secondary} = AppPallete;
    const {onChangeHandler, isLoading, onSignUpHandler, userData,} = useAuth()

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
                    onSubmit={onSignUpHandler}
                    className="w-[90%] md:w-[85%] lg:w-[80%] flex flex-col justify-start items-start space-y-[30px] rounded-[20px]"
                >
                    <InputFields
                        label="name"
                        placeholder="Enter your name"
                        value={userData.name}
                        onChange={onChangeHandler}
                    />
                    <InputFields
                        label="email"
                        placeholder="Enter your email"
                        value={userData.email}
                        onChange={onChangeHandler}
                    />
                    <InputFields
                        label="password"
                        placeholder="Enter your password"
                        type="password"
                        value={userData.password}
                        onChange={onChangeHandler}
                    />
                    <p
                        className="text-white text-center text-sm w-full py-[40px]"
                    >
                        Already have an account? <Link to="/sign-in" style={{color: secondary}}>Sign in</Link>
                    </p>
                    <CustomButton buttonText={isLoading ? "Processing..." : "Continue"} type="submit"/>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage;