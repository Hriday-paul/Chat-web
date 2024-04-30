import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import SendReceiveMessage from "../SendReceiveMessage/SendReceiveMessage";
import MessageTypeChecker from "../../Shared/Message/MessageTypeChecker/MessageTypeChecker";
import SkeletonMessage from "../SkeletonMessage/SkeletonMessage";
import { userType } from "../../../Redux/Features/Api/Api";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";

export interface messageType {
    _id: string;
    msg: {
        type: string;
        message: any;
        reply: boolean;
    },
    sender: {
        name: string;
        email: string;
        photoUrl: string;
    },
    receiver: {
        id: string;
        name: string;
        email: string
        photoUrl: string,
    },
    time: number
}

const ChatBoxMessages = ({ friendDetails, frLoading }: { friendDetails: userType; frLoading : boolean }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { email: myEmail } = useSelector((state: RootState) => state.user);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [messages, setMassages] = useState<messageType[]>([]);
    const axiosPublic = UseAxiosPublic();

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView();
        }
    };

    useEffect(() => {
        if (friendDetails) {
            axiosPublic.get(`/messages?m=${myEmail}&f=${friendDetails.email}`)
                .then(({ data }) => {
                    setMassages(data)
                    setLoading(false)
                })
        }
    }, [friendDetails, myEmail]);

    const updateMessage = (msg: any) => {
        setMassages([...messages, msg])
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div >
            <div className="flex-grow mb-5 min-h-[calc(100vh-144px)] overflow-auto">
                {
                    (isLoading || frLoading) ? <SkeletonMessage /> : messages?.map((msg, indx) => {
                        return <MessageTypeChecker key={msg._id || (msg.msg?.message+indx) || msg.msg.message?.url} msg={msg} frInfo={friendDetails} />
                    })
                }
                <div ref={chatContainerRef}></div>
            </div>

            <SendReceiveMessage friendDetails={friendDetails} refetch={updateMessage} />
        </div>
    );
};

export default ChatBoxMessages;
