import AppPallete from "../../../../core/theme/app_pallete";
import AddTodo from "../components/add_todo";

const TodoPage = () => {
    const {background, primary} = AppPallete;

    return (
        <div
            className="h-[100vh] w-[100vw] flex justify-center items-center"
            style={{backgroundColor: background}}
        >
            <div
                className="w-[35%] h-[80%] flex flex-col justify-start items-center space-y-[59px] rounded-[20px] py-[50px] px-[65px]"
                style={{backgroundColor: primary}}
            >
                <h1 className="text-white text-4xl font-extrabold">Todo App</h1>
                <AddTodo/>
            </div>
        </div>
    );
}

export default TodoPage;