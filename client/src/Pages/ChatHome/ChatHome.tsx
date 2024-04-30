import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/Store";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import chatPhoto from "../../../public/chat-logo-design_93835-108-removebg-preview.png"
import ScrollUser from "../../Components/Ui/ScrollUser/ScrollUser";
import MobileScroll from "../../Components/Ui/ScrollUser/MobileScroll";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.init";
import { signOutUser } from "../../Redux/Features/UserSlice/UserSlice";


const ChatHome = () => {
    const [isShowProfile, setShowProfile] = useState(false);
    const { name, email, photo } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const logOutUser = () => {
        signOut(auth);
        dispatch(signOutUser())
    }

    const onSearch = () => {
        
    }

    return (
        <div>
            <div className="mx-w-7xl mx-auto">
                
                <div className="md:grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 hidden">

                    {/* large device handle */}
                    <div id="scrollableDiv" className="lg:col-span-1 md:col-span-2 users-scroll bg-[#121C22] h-screen overflow-y-auto px-1 shadow-xl border-r border-r-gray-700">
                        <div className="flex items-center justify-between gap-x-3 p-4 sticky top-0 bg-[#121C22] z-50">
                            <div className="relative">
                                <div className="w-12 h-12 avatar online cursor-pointer" onClick={() => setShowProfile(!isShowProfile)}>
                                    <img className="h-12 w-12 rounded-full" src={photo !== "" ? `${photo}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                </div>

                                <div className={`w-[250px] bg-[#0d1418] absolute left-0 z-50 rounded shadow-md shadow-[#121C22]  duration-300 ${isShowProfile ? 'top-12 h-auto' : 'top-16 h-0 overflow-hidden'}`}>

                                    <div className="p-3">
                                        <div className="flex flex-row flex-shrink items-center gap-x-2 text-base font-medium whitespace-nowrap border-b border-gray-700 pb-2">


                                            <div className="avatar z-40">
                                                <div className="w-10 h-10 rounded-full z-40">
                                                    <img className="z-40" src={photo !== "" ? `${photo}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                </div>
                                            </div>

                                            <span className="truncate">
                                                <h3 className="text-gray-200 text-base truncate">{name}</h3>
                                                <p className="truncate text-gray-400 text-sm">{email}</p>
                                            </span>

                                        </div>

                                        <Link to="/profile" className="flex items-center gap-x-2 p-2 relative group cursor-pointer">
                                            <FaRegUser className="text-gray-400 z-30"></FaRegUser>
                                            <p className="z-30 text-base">Profile</p>
                                            <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                                        </Link>

                                        <Link to="/" className="flex items-center gap-x-2 p-2 relative group cursor-pointer" onClick={logOutUser}>
                                            <MdLogout className="text-[#3B82F6] z-30"></MdLogout>
                                            <p className="z-30">SignOut</p>
                                            <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                                        </Link>
                                    </div>
                                </div>


                            </div>

                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <IoSearchOutline className="text-gray-500 text-2xl"></IoSearchOutline>
                                </span>

                                <input onChange={onSearch} type="search" name="q" className="py-2 text-sm text-white bg-[#1B262C] rounded-md pl-10 pr-2 focus:outline-none w-full" placeholder="Search..." autoComplete="off" />
                            </div>

                        </div>

                        <img className="h-32 mx-auto -mt-2" src={chatPhoto} alt="chat photo" />
                        <div className="border-t border-t-gray-700 rounded-b-2xl">
                            <ScrollUser />
                        </div>
                    </div>

                    <div className="md:col-span-3 lg:col-span-3 bg-[url('https://i.ibb.co/NyZkx2Q/e86c13b0-4e16-4c56-b5b5-1a90acbea77c-naruwhatsappwallpaperdark.webp')]">
                        <Outlet />
                    </div>

                </div>

                {/* mobile device handle */}
                <div className="md:hidden">
                    <div id="scrollableDivMobile" className="bg-[#121C22] h-screen users-scroll overflow-y-auto px-1 shadow-xl">
                        <div className="flex items-center justify-between gap-x-3 p-4 sticky z-50 top-0 bg-[#121C22]">
                            <div className="relative">
                                <div className="w-12 h-12 avatar online cursor-pointer" onClick={() => setShowProfile(!isShowProfile)}>
                                    <img className="h-12 w-12 rounded-full" src={photo !== "" ? `${photo}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                </div>

                                <div className={`w-[270px] bg-[#0d1418] absolute left-0 z-50 rounded shadow-md shadow-[#121C22]  duration-300 ${isShowProfile ? 'top-12 h-auto' : 'top-16 h-0 overflow-hidden'}`}>

                                    <div className="p-3">
                                        <div className="flex flex-row flex-shrink items-center gap-1 text-base font-medium whitespace-nowrap border-b border-gray-700 pb-2">

                                            <div className="avatar z-40">
                                                <div className="w-10 h-10 rounded-full z-40">
                                                    <img className="z-40" src={photo !== "" ? `${photo}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                </div>
                                            </div>

                                            <span className="truncate">
                                                <h3 className="truncate text-gray-200 text-base">{name}</h3>
                                                <p className="truncate text-gray-400 text-sm">{email}</p>
                                            </span>

                                        </div>

                                        <Link to="/profile" className="flex items-center gap-x-2 p-2 relative group cursor-pointer">
                                            <FaRegUser className="text-gray-400 z-30"></FaRegUser>
                                            <p className="z-30 text-base">Profile</p>
                                            <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                                        </Link>

                                        <Link to="/" className="flex items-center gap-x-2 p-2 relative group cursor-pointer" onClick={logOutUser}>
                                            <MdLogout className="text-[#3B82F6] z-30"></MdLogout>
                                            <p className="z-30">SignOut</p>
                                            <span className="absolute bg-[#1B262C] top-0 left-0 h-[40px] w-0 z-20 group-hover:w-full duration-200 rounded"></span>
                                        </Link>
                                    </div>
                                </div>


                            </div>

                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <IoSearchOutline className="text-gray-500 text-2xl"></IoSearchOutline>
                                </span>

                                <input onChange={onSearch} type="search" name="q" className="py-2 text-sm text-white bg-[#1B262C] rounded-md pl-10 pr-2 focus:outline-none w-full" placeholder="Search..." autoComplete="off" />
                            </div>

                        </div>

                        <img className="h-32 mx-auto -mt-2" src={chatPhoto} alt="chat photo" />
                        <div id="scrollableDiv" className="border-t border-t-gray-700 rounded-b-2xl">
                            <MobileScroll />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChatHome;