import { messageType } from "../../../Ui/ChatBoxMessages/ChatBoxMessages";
import { userType } from "../../../../Redux/Features/Api/Api";
import { RootState } from "../../../../Redux/Store";
import { useSelector } from "react-redux";
import { RiCheckDoubleLine } from "react-icons/ri";

const VideoMessage = ({ msg, frData }: { msg: messageType; frData: userType }) => {
    const { name: myName, email: myEmail, photo: myPhoto } = useSelector((state: RootState) => state.user);

    return (
        <div>
            <div className={`flex ${msg?.sender?.email == myEmail ? "justify-end" : ''}`}>
                <div className="flex items-start my-5 gap-2">
                    <img className={`w-8 h-8 rounded-full ${msg?.sender?.email == myEmail ? "order-3" : 'order-1'}`} src={msg?.sender?.email == myEmail ? myPhoto : frData.photoUrl} alt="profile image" />

                    <div className={`flex flex-col min-w-60  max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#0B1114] order-2 ${msg?.sender?.email == myEmail ? "rounded-s-xl rounded-es-xl" : 'rounded-e-xl rounded-es-xl'}`}>
                        <div>
                            <h4 className="text-sm font-medium text-gray-400">{msg?.sender?.email == myEmail ? myName : frData.name}</h4>
                        </div>

                        <video width="280" height="130" controls>
                            <source src={msg?.msg?.message?.url} type="video/mp4" />
                        </video>


                        <div className='flex flex-row items-center justify-end gap-x-2'>
                            <span className="text-xs font-normaltext-gray-400">{new Date(msg?.time).getDate() + '-' + (new Date(msg?.time).getMonth() + 1) + '-' + new Date(msg?.time).getFullYear()}</span>
                            <RiCheckDoubleLine className="text-sm text-green-500"></RiCheckDoubleLine>
                        </div>
                    </div>

                    <div className={`hidden inline-flex self-center items-center p-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none text-white bg-[#0B1114] hover:bg-gray-900 focus:ring-gray-600 cursor-pointer ${msg?.sender?.email == myEmail ? "order-1" : 'order-3'}`}>
                        
                    </div>
                </div>


            </div>
        </div>

    );
};

export default VideoMessage;