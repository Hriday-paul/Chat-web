import { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import "react-chat-elements/dist/main.css"
import { authContext } from "../../../ContextHandler/AuthContext/Autthonicate";
import { FaArrowLeft } from "react-icons/fa6";
import MessageTypeChecker from "../../../Components/Message/MessageTypeChecker";
import { IoIosImages } from "react-icons/io";
import { Button, Input } from "antd";
import { BsSendFill } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import FileTypeChecker from "../../../Hooks/FileTypeChecker/FileTypeChecker";

const ChatBox = () => {
    const chatContainerRef = useRef(null);
    const axiosPublic = UseAxiosPublic();
    const [loading, setLoading] = useState(true);
    const loderData = useLoaderData();
    const [messages, setMassages] = useState([]);
    const { socket, userInfo } = useContext(authContext);
    const [fileLoading, setFileLoading] = useState(false);
    const [attachment, setAttachment] = useState(null);
    const navig = useNavigate();
    const inputRef = useRef();

    useEffect(() => {
        socket.on('connect', () => {
            //console.log('connected')
        });
        if (loderData) {
            axiosPublic.get(`/messages?m=${userInfo.email}&f=${loderData.data.email}`)
                .then(({ data }) => {
                    setMassages(data)
                    setLoading(false)
                })
        }
    }, [])

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages])

    socket.on('disconnect', () => {
        //console.log('disconnected')
    });

    const message = {
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
    }

    socket.on(userInfo.email, (msg) => {
        //if your conversation is open
        if (msg?.sender?.email == loderData?.data?.email) {
            setMassages([...messages, msg])
        }
    })


    const handleSendMsg = async (e) => {
        e.preventDefault();
        let messageInfo = {};
        if (attachment) {
            setFileLoading(true)
            messageInfo = await FileTypeChecker(attachment, message)
            setFileLoading(false);
            setAttachment(null);
        }
        else {
            if (e.target.textField.value) {
                messageInfo = await { ...message, msg: { type: 'text', message: e.target.textField.value, reply: false }, time: Date.now() }
            }
        }

        // upload message socket and data base
        if (messageInfo) {
            await socket.emit('sendMessage', messageInfo, loderData.data.email);
            await setMassages([...messages, messageInfo]);
            inputRef.current.input.value = '';
        }
    }


    const fileupload = (e) => {
        setAttachment(e.target.files[0]);
    }


    return (
        <div ref={chatContainerRef} className="h-screen chat-box w-full overflow-y-auto bg-[url('https://cdn.wallpapersafari.com/28/79/p75Yz0.jpg')]">
            <div className="bg-gray-50 shadow-md p-2 flex gap-x-3 items-center sticky top-0 z-50">
                <FaArrowLeft onClick={() => navig('/chat')} className="text-2xl lg:hidden cursor-pointer mr-2"></FaArrowLeft>
                <img className="h-10 w-10 rounded-full" src={loderData.data.photoUrl} alt="profile image" />
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
                        messages?.map((msg) => {
                            return <MessageTypeChecker userInfo={userInfo} key={msg._id} msg={msg} loderData={loderData}></MessageTypeChecker>
                        })
                }
            </div>

            <form onSubmit={handleSendMsg} className="sticky bottom-0 p-3 w-full bg-gray-50 shadow-lg flex flex-row gap-2 items-center">
                <label htmlFor="attachment" className="relative">
                    <IoIosImages className="text-5xl bg-slate-200 text-blue-500 p-2 rounded-md cursor-pointer"></IoIosImages>
                    {
                        attachment && <button onClick={() => setAttachment(null)} className="absolute -top-2 -right-2 text-red-500 text-xl"><RxCross2></RxCross2></button>
                    }
                </label>
                <input onChange={fileupload} type="file" id="attachment" name="attachment" className="hidden" />

                <Input allowClear name="textField" placeholder="write message..." size="large" autoComplete="off" ref={inputRef} />

                <Button loading={fileLoading} htmlType="submit" size="large" type="primary" icon={<BsSendFill className="text-sm" />}>
                    Send
                </Button>
            </form>
            <Toaster></Toaster>
        </div>
    );
};

export default ChatBox;