import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ChatHome from "../Pages/ChatHome/ChatHome";
import Private from "../Pages/Shared/Private/Private";
import ChatBox from "../Pages/Shared/ChatBox/ChatBox";
import UseAxiosPublic from "../Hooks/UseAxiosPublic/UseAxiosPublic";
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Root from '../Root/Root'

const axiosPublic = UseAxiosPublic();

const rout = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Root></Root>,
    },
    {
        path: '/chat',
        element: <Private><ChatHome></ChatHome></Private>,
        children: [
            {
                path: '/chat/:id',
                loader: ({ params }) => axiosPublic.get(`/user/${params.id}`),
                element: <Private><ChatBox></ChatBox></Private>
            }
        ]
    },
    {
        path: '/mchat/:id',
        loader: ({ params }) => axiosPublic.get(`/user/${params.id}`),
        element: <Private><ChatBox></ChatBox></Private>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/login',
        element: <Login></Login>
    },

])

export default rout;