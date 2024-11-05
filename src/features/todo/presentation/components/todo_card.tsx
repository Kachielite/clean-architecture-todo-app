import {Todo} from "../../domain/entity/todo";
import AppPallete from "../../../../core/theme/app_pallete";
import DoneIcon from "../../../../assets/icons/done.png";
import DeleteIcon from "../../../../assets/icons/delete.png";

type TodoCardProps = {
    todo: Todo;
    updateTodoHandler: (todo: Todo) => void;
    deleteTodoHandler: (id: string) => void;
}

const TodoCard = ({todo, updateTodoHandler, deleteTodoHandler}: TodoCardProps) => {
    return (
        <div
            style={{backgroundColor: AppPallete.cardBackground}}
            className="w-full flex flex-row justify-between items-center rounded-[10px] p-[22px]"
        >
            <p style={{color: AppPallete.secondary}}
               className={`text-[16px] ${todo.isCompleted && 'line-through'}`}>{todo.title}</p>
            {!todo.isCompleted && <div className="flex flex-row items-center justify-end space-x-[12px]">
                <button
                    onClick={() => updateTodoHandler(todo)}
                >
                    <img src={DoneIcon} alt="edit icon" className="size-[22px]"/>
                </button>
                <button
                    onClick={() => deleteTodoHandler((todo.id as string))}
                >
                    <img src={DeleteIcon} alt="delete icon" className="size-[22px]"/>
                </button>
            </div>}
        </div>
    );
}

export default TodoCard;