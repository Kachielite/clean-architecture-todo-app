import {ChangeEventHandler} from "react";
import AppPallete from "../../../../core/theme/app_pallete";

type inputFieldProps = {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    type?: "password" | "text"
}

const InputFields = ({label, placeholder, value, onChange, type}: inputFieldProps) => {
    const {primary, secondary} = AppPallete;

    return (
        <div className="w-full flex flex-col justify-start items-start space-y-[10px]">
            <label
                className="text-left text-[16px] text-white capitalize"
                htmlFor={label}
            >
                {label}
            </label>
            <input
                className="w-full h-[50px] px-[15px] py-[11px] rounded-[10px] placeholder:text-[#777777] text-[16px] text-white"
                onChange={onChange}
                placeholder={placeholder}
                style={{backgroundColor: primary, border: `1px solid ${secondary}`}}
                type={type}
                value={value}
            />
        </div>
    )
}

export default InputFields;