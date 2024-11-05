import AppPallete from "../../../../core/theme/app_pallete";
import AddIcon from "../../../../shared/assets/icons/add.png";
import {Todo} from "../../domain/entity/todo";

type AddTodoProps = {
    newTodo?: Todo | null;
    onBlurHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addTodoHandler: () => void;
}


const AddTodo = ({onBlurHandler, addTodoHandler, newTodo}: AddTodoProps) => {
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
                onBlur={onBlurHandler}
                value={newTodo?.title}
            />
            <button
                className="size-[40px] rounded-[10px] flex justify-center items-center"
                style={{backgroundColor: secondary}}
                onClick={addTodoHandler}
            >
                <img src={AddIcon} alt="plus icon"/>
            </button>
        </div>
    );
}

export default AddTodo;