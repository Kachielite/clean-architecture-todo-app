import React from "react";
import {ToastContainer} from "react-toastify";
import AppRoutes from "./core/routes";
import Loader from "./shared/presentation/components/common/Loader";
import AppPallete from "./core/theme/app_pallete";
import 'react-toastify/dist/ReactToastify.css';
import useCheckAuth from "./features/auth/presentation/hooks/useCheckAuth";


const App = () => {
    const {background} = AppPallete;
    const {status} = useCheckAuth();

    return (
        <>
            <ToastContainer/>
            <div
                className="h-[100vh] w-[100vw] flex justify-center items-center"
                style={{backgroundColor: background}}
            >
                {status === "loading" ? <Loader/> : <AppRoutes/>}
            </div>
        </>
    );
};

export default App;
