
import { NavLink } from 'react-router-dom';
import { userType } from '../../../Redux/Features/Api/Api';

const ChatUser = ({ data }: { data: userType }) => {
    return (
        <div>
            <div className='md:hidden'>
                <NavLink to={`/mchat/${data._id}`} className={({ isActive }) => isActive ? " flex flex-row gap-x-2 items-center px-3 py-2 shadow-lg bg-[#1B262C] hover:shadow-2xl duration-100 cursor-pointer rounded-md hover:bg-[#1B262C] my-1" : "flex flex-row gap-x-2 items-center px-3 py-2 border-b border-b-gray-700 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-[#1B262C] my-1"
                }>
                    <div className="avatar z-0">
                        <div className="w-10 h-10 rounded-full z-0">
                            <img className="z-0" src={data.photoUrl !== null ? `${data.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        </div>
                    </div>
                    <h2 className="text-lg font-medium text-[#8fa9be] truncate">{data.name}</h2>

                </NavLink>
            </div>
            <div className='hidden md:block'>
                <NavLink to={`/chat/${data._id}`} className={({ isActive }) => isActive ? " flex flex-row gap-x-2 items-center px-3 py-2 shadow-lg bg-[#1B262C] hover:shadow-2xl duration-100 cursor-pointer rounded-md hover:bg-[#1B262C] my-1" : "flex flex-row gap-x-2 items-center px-3 py-2 border-b border-b-gray-700 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-[#1B262C] my-1"
                }>
                    <div className="avatar z-0">
                        <div className="w-10 h-10 rounded-full z-0">
                            <img className="z-0" src={data.photoUrl !== null ? `${data.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        </div>
                    </div>
                    <h2 className="text-lg font-medium text-[#8fa9be] truncate">{data.name}</h2>
                </NavLink>
            </div>

        </div>
    );
};

export default ChatUser;