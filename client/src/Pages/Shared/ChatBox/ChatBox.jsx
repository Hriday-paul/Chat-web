import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css"
import { authContext } from "../../../ContextHandler/AuthContext/Autthonicate";
import { SendOutlined } from '@ant-design/icons';
import Search from "antd/es/input/Search";
import { FaArrowLeft } from "react-icons/fa6";

const ChatBox = () => {
    const { id } = useParams();
    const axiosPublic = UseAxiosPublic();
    const [loading, setLoading] = useState(true);
    const loderData = useLoaderData();
    const [messages, setMassages] = useState([]);
    const { socket, userInfo } = useContext(authContext)
    const navig = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        if (!userInfo.email) {
            navig('/login')
        }
        else {
            socket.on('connect', () => {
                //console.log('connected')
            });
        }
    }, [])

    useEffect(() => {
        if (loderData) {
            axiosPublic.get(`/messages?m=${userInfo.email}&f=${loderData.data.email}`)
                .then(({ data }) => {
                    setMassages(data)
                    setLoading(false)
                })
        }
    }, [])

    socket.on('disconnect', () => {
        //console.log('disconnected')
    });

    const sendMsg = async (msg) => {
        const messageInfo = await {
            msg: { type: 'text', message: msg, reply: false },
            sender: {
                name: userInfo.displayName,
                email: userInfo.email,
                photoUrl: userInfo.photoURL
            },
            receiver: {
                id: loderData.data._id,
                name: loderData.data.name,
                email: loderData.data.email,
                photoUrl: loderData.data.photoUrl
            },
            time: Date.now()
        }

        await socket.emit('sendMessage', messageInfo, loderData.data.email)
        setMassages([...messages, messageInfo]);
    }

    socket.on(userInfo.email, (msg) => {
        console.log(userInfo.email)
        setMassages([...messages, msg])
    })
    

    const handleSendMsg = async(value) => {
        if (value) {
            await sendMsg(value)
            inputRef.current.input.value = '';
        }
    }


    return (
        <div className="h-screen w-full overflow-y-auto bg-[url('https://cdn.wallpapersafari.com/28/79/p75Yz0.jpg')]">
            <div className="bg-gray-50 shadow-md p-2 flex gap-x-3 items-center sticky top-0 z-50">
            <FaArrowLeft onClick={()=>navig(-1)} className="text-lg cursor-pointer"></FaArrowLeft>
                <img className="h-10 rounded-full" src={loderData.data.photoUrl} alt="profile image" />
                <h2 className="font-medium">{loderData.data.name}</h2>
            </div>


            <div className="flex-grow mb-5 min-h-[calc(100vh-140px)]">
                {
                    loading ? <div className="my-5">
                        <div className="chat chat-start">
                            <div className="skeleton w-52 h-12"></div>
                        </div>
                        <div className="chat chat-end">
                            <div className="skeleton w-52 h-14"></div>
                        </div>
                        <div className="chat chat-start">
                            <div className="skeleton w-52 h-12"></div>
                        </div>
                        <div className="chat chat-start">
                            <div className="skeleton w-52 h-16"></div>
                        </div>
                        <div className="chat chat-end">
                            <div className="skeleton w-52 h-14"></div>
                        </div>
                    </div> :
                        messages?.map((msg, indx) => {
                            return <MessageBox key={indx}
                                position={msg?.sender?.email == userInfo.email ? "right" : 'left'}
                                type={msg?.msg?.type}
                                title={msg?.sender?.email == userInfo.email ? userInfo.name : loderData.data.name}
                                text={msg?.msg?.message}
                                date={new Date(msg.time)}
                                avatar={msg?.sender?.email == userInfo.email ? userInfo.photoUrl : loderData.data.photoUrl}
                                status={'read'}
                            />
                        })
                }

            </div>

            <div className="sticky bottom-0 p-3 w-full bg-gray-50 shadow-lg">
                <Search
                    allowClear
                    size="large"
                    placeholder="write message..."
                    onSearch={handleSendMsg}
                    enterButton={"send"}
                    ref={inputRef}
                />
            </div>
        </div>
    );
};

export default ChatBox;