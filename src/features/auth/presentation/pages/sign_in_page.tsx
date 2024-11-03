import {Link} from 'react-router-dom';
import AppPallete from "../../../../core/theme/app_pallete";
import InputFields from "../components/input_fields";
import CustomButton from "../components/custom_button";

const SignInPage = () => {
    const {background, primary, secondary} = AppPallete;

    return (
        <div
            className="h-[100vh] w-[100vw] flex justify-center items-center py-[15px]"
            style={{backgroundColor: background}}
        >
            <div
                className="w-[90%] md:w-[65%] lg:w-[30%] h-fit flex flex-col justify-start items-center space-y-[60px] rounded-[20px] py-[50px] px-[65px]"
                style={{backgroundColor: primary}}
            >
                <h1 className="text-white text-4xl font-extrabold">Sign In</h1>
                <form
                    className="w-[90%] md:w-[85%] lg:w-[80%] flex flex-col justify-start items-start space-y-[30px] rounded-[20px]"
                >
                    <InputFields
                        label="email"
                        placeholder="Enter your email"
                    />
                    <InputFields
                        label="password"
                        placeholder="Enter your password"
                    />
                    <p
                        className="text-white text-center text-sm w-full py-[40px]"
                    >
                        Don't have an account? <Link to="/sign-up" style={{color: secondary}}>Sign up</Link>
                    </p>
                    <CustomButton buttonText="Continue" type="submit" onClick={() => null}/>
                </form>
            </div>
        </div>
    );
}

export default SignInPage;