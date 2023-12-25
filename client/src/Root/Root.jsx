import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div>
            <nav>
                I am anvbar
            </nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;