import {Todo} from "../../domain/entity/todo";
import AppPallete from "../../../../core/theme/app_pallete";
import TodoCard from "./todo_card";

type TodoCardsProps = {
    todos: Todo[] | null;
    updateTodoHandler: (todo: Todo) => void;
    deleteTodoHandler: (id: string) => void;
    isCompleted: boolean;
}


const TodoCards = ({todos, updateTodoHandler, deleteTodoHandler, isCompleted}: TodoCardsProps) => {
    const filteredTodos = todos && todos.filter((todo) => todo.isCompleted === isCompleted);
    return (
        <div
            className="w-full flex flex-col justify-start items-start space-y-[16px]"
        >
            <h1
                style={{color: AppPallete.white}}
                className="text-[16px]">
                {isCompleted ? "Completed Task" : "Todo Task"} ({filteredTodos && filteredTodos.length})
            </h1>
            {filteredTodos && filteredTodos.map((todo) =>
                <TodoCard
                    key={todo.id}
                    todo={todo}
                    updateTodoHandler={updateTodoHandler}
                    deleteTodoHandler={deleteTodoHandler}
                />)
            }
        </div>
    );
}

export default TodoCards;