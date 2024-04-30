import { useState } from "react";
import SkeletonUser from "../../Shared/SkeletonUser/SkeletonUser";
import InfiniteScroll from "react-infinite-scroll-component";
import { SyncOutlined } from '@ant-design/icons';
import { useGetFriendsQuery } from "../../../Redux/Features/Api/Api";
import { Spin } from "antd";
import ChatUser from "../../Shared/ChatUser/ChatUser";
import { RootState } from "../../../Redux/Store";
import { useSelector } from "react-redux";


const MobileScroll = () => {
    const { email } = useSelector((state: RootState) => state.user);
    const limit = 10;
    const [dataCount, setDataCount] = useState(limit);
    const { data } = useGetFriendsQuery({ dataCount, my: email });

    const handleMore = () => {
        setDataCount(dataCount + limit)
    }

    return (
        <div>
            {
                <InfiniteScroll
                    scrollableTarget="scrollableDivMobile"
                    dataLength={data?.friends.length || 0}
                    next={handleMore}
                    hasMore={data?.hasMore || false}
                    loader={<div className="py-2 flex justify-center items-center">
                        <div className="bg-gray-700 shadow-gray-900 shadow-xl h-9 w-9 mx-auto flex justify-center items-center rounded-full">
                            <Spin spinning={data?.hasMore || false} indicator={<SyncOutlined style={{ fontSize: 20, color: 'white' }} spin />} />
                        </div>
                    </div>}
                    endMessage={
                        data ? <p className="text-center text-gray-300 text-base">
                            No friends found
                        </p> : <></>
                    }
                >
                    {
                        data ? data.friends?.map((data) => {
                            return <div key={data._id} className="flex flex-col gap-y-10">
                                <ChatUser data={data}></ChatUser>
                            </div>
                        }) : <div className="px-3 mt-5"><SkeletonUser></SkeletonUser></div>
                    }
                </InfiniteScroll>
            }
        </div>
    );
};

export default MobileScroll;