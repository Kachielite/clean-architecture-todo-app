import AppPallete from "../../../../core/theme/app_pallete";
import AddIcon from "../../../../shared/assets/icons/add.png";

const AddTodo = () => {
    const {primary, secondary} = AppPallete;
    return (
        <div
            className="w-full flex flex-row justify-between items-center"
        >
            <input
                className="w-[87%] h-[40px] px-[15px] py-[11px] rounded-[10px] placeholder:text-[#777777] text-[16px] text-white"
                placeholder="Add a new task"
                style={{backgroundColor: primary, border: `1px solid ${secondary}`}}
                type="text"
                onChange={(e) => console.log(e.target.value)}
            />
            <button
                className="size-[40px] rounded-[10px] flex justify-center items-center"
                style={{backgroundColor: secondary}}
                onClick={() => null}
            >
                <img src={AddIcon} alt="plus icon"/>
            </button>
        </div>
    );
}

export default AddTodo;