import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage";
import LiveChatPage from "./pages/LiveChatPage";
import SingleUserPage from "./pages/SingleUserPage";
import MyProfilePage from "./pages/MyProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import SinglePostPage from "./pages/SinglePostPage";
import {ToastContainer} from "react-toastify";


function App() {
    return (
        <div className="App">

            <BrowserRouter>
                <NavBar/>

                <Routes>

                    <Route path={"/"} element={<HomePage/>}></Route>
                    <Route path={"/login"} element={<LoginPage/>}></Route>
                    <Route path={"/liveChat"} element={<LiveChatPage/>}></Route>
                    <Route path={"/profile"} element={<MyProfilePage/>}></Route>
                    <Route path={"/createPost"} element={<CreatePostPage/>}></Route>
                    <Route path={"/post/:postId"} element={<SinglePostPage/>}></Route>
                    <Route path={"/user/:username"} element={<SingleUserPage/>}></Route>

                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </div>
    );
}

export default App;
