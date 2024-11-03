import {Oval} from "react-loader-spinner";
import AppPallete from "../../../../core/theme/app_pallete";

const Loader = () => {
    const {secondary} = AppPallete;
    return (
        <Oval
            visible={true}
            height="80"
            width="80"
            color={secondary}
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
};

export default Loader;
