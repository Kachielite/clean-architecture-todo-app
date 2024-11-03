import {Route, Routes} from "react-router-dom";
import TodoPage from "../../features/todo/presentation/pages/todo_page";
import SignInPage from "../../features/auth/presentation/pages/sign_in_page";
import SignUpPage from "../../features/auth/presentation/pages/sign_up_page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<TodoPage/>}/>
            <Route path="/sign-in" element={<SignInPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
        </Routes>
    )
}

export default AppRoutes;