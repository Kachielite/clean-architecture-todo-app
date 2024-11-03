import AppPallete from "../../../../core/theme/app_pallete";

type CustomButtonProps = {
    buttonText: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}


const CustomButton = ({buttonText, onClick, type}: CustomButtonProps) => {
    const {secondary} = AppPallete
    return (
        <button
            className="w-full h-[60px] px-[15px] py-[11px] rounded-[10px] placeholder:text-[#777777] text-[16px] text-white font-bold"
            onClick={onClick}
            style={{backgroundColor: secondary}}
            type={type}
        >
            {buttonText}
        </button>
    )
}

export default CustomButton