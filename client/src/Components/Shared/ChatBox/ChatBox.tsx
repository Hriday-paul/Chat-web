import { useNavigate, useParams } from "react-router-dom";
import { useGetFriendsDetailsQuery } from "../../../Redux/Features/Api/Api";
import { Toaster } from "react-hot-toast";
import { Modal } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ChatBoxMessages from "../../Ui/ChatBoxMessages/ChatBoxMessages";


const ChatBox = () => {
    const { id } = useParams();
    const { data: frDetails, isLoading: frloading, isError: frError } = useGetFriendsDetailsQuery(id || '');

    const navig = useNavigate();

    if (frError) {
        Modal.confirm({
            title: 'Connection Error',
            icon: <ExclamationCircleOutlined />,
            content: 'Some thing wrong. Check your internet connection and try again!',
            okText: 'Ok',
            cancelText: 'Cencel',
        });
    }


    return (
        <div>
            <div className="h-screen chat-box w-full overflow-y-auto bg-[url('https://i.ibb.co/NyZkx2Q/e86c13b0-4e16-4c56-b5b5-1a90acbea77c-naruwhatsappwallpaperdark.webp')]">
                <div className="bg-[#121C22] text-gray-200 shadow-md p-2 flex gap-x-3 items-center sticky top-0 z-50">
                    <FaArrowLeft onClick={() => navig('/chat')} className="text-2xl md:hidden cursor-pointer mr-2"></FaArrowLeft>

                    {!frloading ? <div className="flex gap-x-2 items-center">
                        <div className="avatar z-0">
                            <div className="w-10 h-10 rounded-full z-0">
                                <img className="z-0" src={frDetails?.photoUrl} alt="profile image" />
                            </div>
                        </div>
                        <h2 className="font-medium">{frDetails?.name}</h2>
                    </div> : <div className="flex items-center gap-x-2">
                        <Skeleton circle={true} width={40} height={40} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                        <Skeleton containerClassName="flex-1" height={20} width={110} enableAnimation={true} baseColor={"#1B262C"} highlightColor='#26333a' />
                    </div>}

                </div>

                {frDetails && <ChatBoxMessages friendDetails={frDetails} />}   

                <Toaster />
            </div>
        </div>
    );
};

export default ChatBox;