import { BsSendFill } from "react-icons/bs";
import { IoIosImages } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Button } from "antd";
import { SocketConnectContext } from "../../../ContextHandler/SocketContext/SocketContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { messageType } from "../ChatBoxMessages/ChatBoxMessages";
import { userType } from "../../../Redux/Features/Api/Api";
import FileTypeCheckeer from "../FileTypeChecker/FileTypeCheckeer";

const SendReceiveMessage = ({ friendDetails, refetch }: { friendDetails: userType; refetch: (msg: any) => void }) => {
    const { socket } = useContext(SocketConnectContext) || { socket: '' };
    const inputRef = useRef<HTMLInputElement>(null);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [fileLoading, setFileLoading] = useState(false);
    const { email: myEmail, name: myName, photo: myPhoto } = useSelector((state: RootState) => state.user);
    const sendingAudio = useRef<HTMLAudioElement>(null);
    const receiveAudio = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        socket.on('connect', () => {
            //console.log('connected')
        });
    }, [])

    // receive message
    socket.on(myEmail, (msg: messageType) => {
        //if your conversation is open
        if (msg?.sender?.email == friendDetails.email) {
            // try to update all messages, when i got a new message
            refetch(msg);

            if (receiveAudio.current) {
                receiveAudio.current.play();
            }
        }
    })

    const message = {
        sender: {
            name: myName,
            email: myEmail,
            photoUrl: myPhoto
        },
        receiver: {
            id: friendDetails._id,
            name: friendDetails.name,
            email: friendDetails.email,
            photoUrl: friendDetails.photoUrl
        },
    }


    const handleSendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        let messageInfo = {

        };
        if (attachment) {
            setFileLoading(true)
            messageInfo = await FileTypeCheckeer(attachment, message)
            setFileLoading(false);
            setAttachment(null);
        }
        else {
            if (formElement.textField.value && formElement.textField.value != '') {
                messageInfo = { ...message, msg: { type: 'text', message: formElement.textField.value, reply: false }, time: Date.now() }
            }
            else {
                return
            }
        }

        // upload message socket and data base
        if (Object.keys(messageInfo).length > 0) {
            await socket.emit('sendMessage', messageInfo, friendDetails.email);
            refetch(messageInfo);
            if (sendingAudio.current) {
                sendingAudio.current.play();
            }
            if (inputRef.current) inputRef.current.value = '';
        }
    }

    const fileupload = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const input = e.target
        if (!input.files?.length) {
            return;
        }
        setAttachment(input.files[0]);
    }

    return (
        <form onSubmit={handleSendMsg} className="sticky bottom-0 p-3 w-full bg-[#121C22] shadow-lg flex flex-row gap-2 items-center">
            <label htmlFor="attachment" className="relative">
                <IoIosImages className="h-11 w-11 bg-[#0B1114] text-white hover:text-blue-500 duration-150 p-2 rounded-md cursor-pointer"></IoIosImages>
                {
                    attachment && <button onClick={() => setAttachment(null)} className="absolute -top-2 -right-2 text-red-500 text-xl"><RxCross2></RxCross2></button>
                }
            </label>
            <input onChange={fileupload} type="file" id="attachment" name="attachment" className="hidden" />


            <input type="text" name="textField" className="text-sm rounded-lg block w-full py-2.5 px-3 bg-[#0B1114] placeholder-gray-400 text-white border border-[#0B1114] focus:outline-0 focus:border-[#3B82F6]" placeholder="write message..." autoComplete="off" ref={inputRef}></input>

            <Button loading={fileLoading} htmlType="submit" size="large" style={{ background: '#0B1114', border: '#0B1114' }} icon={<BsSendFill className="text-sm" />}>
                Send
            </Button>


            {/* message sending audio */}
            <audio ref={sendingAudio}>
                <source src="https://res.cloudinary.com/devlj6p7h/video/upload/v1705640145/docs/g5elp0o0lubgyrz76jgn.mp3" type="audio/ogg" />
            </audio>
            {/* message receiving audio */}
            <audio ref={receiveAudio} id="receivingAudio">
                <source src="https://res.cloudinary.com/devlj6p7h/video/upload/v1705641840/docs/q6r5ualu8qwdzpnou2dq.mp3" type="audio/ogg" />
            </audio>

        </form>
    );
};

export default SendReceiveMessage;