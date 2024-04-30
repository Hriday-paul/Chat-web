import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Private from "../Components/Shared/Private/Private";
import ChatHome from "../Pages/ChatHome/ChatHome";
import ChatBox from "../Components/Shared/ChatBox/ChatBox";
import Profile from "../Pages/Profile/Profile";


const Rout = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [{
            path: '/',
            element: <Home />
        }]
    },
    {
        path: '/chat',
        element: <Private><ChatHome></ChatHome></Private>,
        children: [
            {
                path: '/chat/:id',
                element: <Private><ChatBox></ChatBox></Private>
            }
        ]
    },
    {
        path: '/profile',
        element: <Private><Profile></Profile></Private>
    },
    // mobile device handle rout
    {
        path: '/mchat/:id',
        element: <Private><ChatBox></ChatBox></Private>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])

export default Rout;