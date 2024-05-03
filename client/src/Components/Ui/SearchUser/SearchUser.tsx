import { RiArrowDropRightLine } from "react-icons/ri";
import { userType } from "../../../Redux/Features/Api/Api";
import { NavLink } from "react-router-dom";


const SearchUser = ({ user, closeModal }: { user: userType, closeModal: () => void }) => {
    return (
        <div>

            {/* // large screen */}
            <div className='hidden md:block'>
                <NavLink onClick={closeModal} to={`/chat/${user._id}`} className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full bg-white/5 hover:bg-white/10 cursor-pointer border-1 border-gray-700 rounded-lg">

                    <div className="lg:flex md:flex items-center">

                        <div className="avatar z-0 border mr-2 p-1 rounded-full">
                            <div className="w-10 h-10 rounded-full z-0 ">
                                <img className="z-0" src={user.photoUrl !== null ? `${user.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-base leading-3 text-gray-100 font-bold w-full">{user.name}</h3>
                        </div>
                    </div>

                    <RiArrowDropRightLine className="text-4xl text-white" />
                </NavLink>
            </div>

            {/* // mobile screen */}
            <div className='md:hidden'>
                <NavLink onClick={closeModal} to={`/mchat/${user._id}`} className="flex items-center justify-between w-full p-2 lg:rounded-full md:rounded-full bg-white/5 hover:bg-white/10 cursor-pointer border-1 border-gray-700 rounded-lg">

                    <div className="flex items-center">

                        <div className="avatar z-0 border mr-2 p-1 rounded-full">
                            <div className="w-7 h-7 rounded-full z-0 ">
                                <img className="z-0" src={user.photoUrl !== null ? `${user.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-sm leading-3 text-gray-100 font-bold w-full">{user.name}</h3>
                        </div>
                    </div>

                    <RiArrowDropRightLine className="text-3xl text-white" />
                </NavLink>
            </div>

        </div>
    );
};

export default SearchUser;