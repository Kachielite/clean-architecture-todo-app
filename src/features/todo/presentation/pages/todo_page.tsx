import AppPallete from "../../../../core/theme/app_pallete";
import AddTodo from "../components/add_todo";
import useTodo from "../hooks/useTodo";
import Loader from "../../../../shared/presentation/components/common/Loader";
import TodoCards from "../components/todo_cards";

const TodoPage = () => {
    const {background, primary} = AppPallete;
    const {todos, isLoading, addTodoHandler, onBlurHandler, deleteTodoHandler, updateTodoHandler, newTodo} = useTodo();

    console.log("todos", todos)

    return (
        <>
            {isLoading ? <Loader/> : <div
                className="h-[100vh] w-[100vw] flex justify-center items-center"
                style={{backgroundColor: background}}
            >
                <div
                    className="w-[35%] min-h-[80%] flex flex-col justify-start items-center space-y-[59px] rounded-[20px] py-[50px] px-[65px]"
                    style={{backgroundColor: primary}}
                >
                    <h1 className="text-white text-4xl font-extrabold">Todo App</h1>
                    <AddTodo
                        onBlurHandler={onBlurHandler}
                        addTodoHandler={addTodoHandler}
                        newTodo={newTodo}
                    />
                    <TodoCards
                        todos={todos}
                        updateTodoHandler={updateTodoHandler}
                        deleteTodoHandler={deleteTodoHandler}
                        isCompleted={false}
                    />
                    <TodoCards
                        todos={todos}
                        updateTodoHandler={updateTodoHandler}
                        deleteTodoHandler={deleteTodoHandler}
                        isCompleted={true}
                    />
                </div>
            </div>}
        </>
    );
}

export default TodoPage;