import { useForm, SubmitHandler } from "react-hook-form"
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import { creatWithGithub, creatWithGoogle, loginWithEmailPass } from "../../Redux/Features/UserSlice/UserSlice";
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
    email: string;
    password: string;
}
const Login = () => {
    const navig = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, isSuccess, isError, error } = useSelector((state: RootState) => state.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const handleLogin: SubmitHandler<Inputs> = (data) => {
        dispatch(loginWithEmailPass(data));
    };

    const signInWithGoogle = () => {
        dispatch(creatWithGoogle())
    }
    const signInWithGithub = () => {
        dispatch(creatWithGithub())
    }

    if (isError) {
        if(error == 'Firebase: Error (auth/invalid-credential).'){
            toast.error('wrong email & password')
        }
        else toast.error(error || 'Something wrong, try again')
    }

    if (isSuccess) {
        navig('/chat')
    }

    return (
        <Spin spinning={isLoading} indicator={<SyncOutlined style={{ fontSize: 30 }} spin />} >
            <div className="bg-black  min-h-screen flex flex-col justify-center items-center">
                <div className="bg-gray-900 shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
                    <div className="text-center w-full font-bold text-3xl text-gray-100">
                        LOGIN
                    </div>
                    <div
                        className="w-full bg-white/5 my-3"
                    ></div>
                    <form onSubmit={handleSubmit(handleLogin)} >
                        <div className="flex flex-col gap-4 px-0 py-4">
                            <div>
                                <label className="text-gray-200">Email address</label>

                                <svg xmlns="http://www.w3.org/2000/svg" className="font-medium text-2xl text-gray-300 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input
                                    className="py-2 pl-10 border bg-white/10 border-gray-700  w-full focus:outline-0 focus:border-gray-500 text-gray-200"
                                    placeholder="Email address"
                                    type="email"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
                            </div>
                            <div>
                                <label className="text-gray-200">Password</label>

                                <svg xmlns="http://www.w3.org/2000/svg" className="font-medium text-2xl text-gray-300 absolute p-2.5 px-3 w-11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    className="py-2 pl-10 border bg-white/10 border-gray-700  w-full focus:outline-0 focus:border-gray-500 text-gray-200"
                                    placeholder="Password"
                                    type="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
                            </div>
                            <div className="w-full flex flex-row gap-2">
                                <button
                                    className="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-0 flex flex-row justify-center items-center gap-1"
                                    type="submit"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg> Login
                                </button>
                                <Link to='/register' className="border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out w-6/12 text-indigo-500 p-2 flex flex-row justify-center items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg> Sign-up
                                </Link>
                            </div>
                            <div className="flex flex-row justify-center my-2">
                                <span className="absolute text-white px-4">or</span>
                                <div
                                    className="w-full bg-gray-200 "
                                ></div>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-4 px-0 py-4">
                        <div className="w-full flex flex-col gap-2">
                            <button onClick={signInWithGoogle} className="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-red-600 duration-100 ease-in-out">
                                <FaGoogle className="text-lg text-white" />
                                Sign-in with Google
                            </button>

                            <button onClick={signInWithGithub} className="bg-blue-700 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-blue-800 duration-100 ease-in-out">
                                <FaGithub className="text-lg text-white" />
                                Sign-in with Github
                            </button>
                        </div>
                        {/* <div className="w-full flex flex-row justify-end">
                            <p className="text-white cursor-pointer">Forgot password</p>
                        </div> */}
                    </div>
                </div>
                <Toaster />
            </div>
        </Spin>
    );
};

export default Login;