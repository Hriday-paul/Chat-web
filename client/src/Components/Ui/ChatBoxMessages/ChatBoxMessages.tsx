import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import SendReceiveMessage from "../SendReceiveMessage/SendReceiveMessage";
import MessageTypeChecker from "../../Shared/Message/MessageTypeChecker/MessageTypeChecker";
import { useGetMessagesQuery, userType } from "../../../Redux/Features/Api/Api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spin } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { MdErrorOutline } from "react-icons/md";
import { ScrollRestoration } from "react-router-dom";

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

const ChatBoxMessages = ({ friendDetails }: { friendDetails: userType }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const { email: myEmail } = useSelector((state: RootState) => state.user);
    const limit = 15;
    const [messageCount, setMessageCount] = useState(limit);
    const { data, isSuccess, isError } = useGetMessagesQuery({ m: myEmail, f: friendDetails.email, limit: messageCount }, { refetchOnMountOrArgChange: true });
    const [messages, setMassages] = useState<messageType[]>([]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollIntoView();
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setMassages(data.messages);
        }
    }, [data, isSuccess]);

    const updateMessage = (msg: any) => {
        setMassages([msg, ...messages]);
        scrollToBottom();
    }

    const handleMore = () => {
        setMessageCount(messageCount + limit);
    };

    return (
        <div >
            {
                isError ? <div>
                    <div className="flex justify-center items-center mb-5 h-[calc(100vh-144px)]">
                        <div className="space-y-2">
                            <MdErrorOutline className="text-3xl md:text-4xl lg:text-6xl text-white text-center mx-auto" />
                            <h1 className="text-base md:text-xl lg:text-2xl text-white text-center ">Something Wrong</h1>
                            <p className="text-xs md:text-sm lg:text-base text-center text-gray-300">Check your internet connection & try again</p>
                        </div>
                    </div>
                </div>
                    :
                    <div id="scrollableMessage" className=" h-[calc(100vh-124px)] overflow-auto flex flex-col-reverse">

                        <InfiniteScroll
                            dataLength={data?.messages.length || 0}
                            next={handleMore}
                            hasMore={data?.hasMore || false}
                            style={{ display: 'flex', flexDirection: 'column-reverse' }}
                            inverse={true}
                            initialScrollY={0}
                            loader={<div className="py-2 flex justify-center items-center mt-1">
                                <div className="bg-gray-700 shadow-gray-900 shadow-xl h-9 w-9 mx-auto flex justify-center items-center rounded-full">
                                    <Spin spinning={true} indicator={<SyncOutlined style={{ fontSize: 20, color: 'white' }} spin />} />
                                </div>
                            </div>}
                            scrollableTarget="scrollableMessage"
                        >
                            {
                                messages?.map((msg, indx) => {
                                    return <MessageTypeChecker key={msg._id || (msg.msg?.message + indx) || msg.msg.message?.url} msg={msg} frInfo={friendDetails} />
                                })
                            }

                        </InfiniteScroll>

                    </div>}

            <div ref={chatContainerRef}></div>

            <SendReceiveMessage friendDetails={friendDetails} refetch={updateMessage} />

            <ScrollRestoration />
        </div>
    );
};

export default ChatBoxMessages;
