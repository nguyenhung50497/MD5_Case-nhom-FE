import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";


function App() {
    const user = useSelector( state => state.user.currentUser);
    return (
        <>
            <div className="container-fluid">
                <Routes>
                    <Route path={'/'} element={<Login></Login>}></Route>
                    <Route path={'/register'} element={<Register></Register>}></Route>
                    {
                        user !== "User not found" && user !== "Wrong password" ?
                        <Route path={'home'} element={<Home/>}>
                            {/*<Route path={'homes'} element={<ListHome/>}></Route>*/}
                            {/*<Route path={'create-album'} element={<CreateHome/>}></Route>*/}
                            {/*<Route path={'edit-album/:id'} element={<EditHome/>}></Route>*/}
                        </Route> :
                        <Route path={'*'} element={<Login></Login>}></Route>
                    }
                </Routes>
            </div>
        </>
    );
}

export default App;
