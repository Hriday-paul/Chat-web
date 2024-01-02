import { useContext, useEffect, useState } from "react";
import { authContext } from "../../ContextHandler/AuthContext/Autthonicate";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import Search from "antd/es/input/Search";
import chatPhoto from "../../../public/chat-logo-design_93835-108-removebg-preview.png"
import { Skeleton, Spin } from "antd";
import ChatUser from "../Shared/ChatUser/ChatUser";
import { NavLink, Outlet, useNavigation } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

const ChatHome = () => {

    const { userInfo } = useContext(authContext)
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState([]);
    const axiosPublic = UseAxiosPublic();
    const navigation = useNavigation();

    const fetchData = () => {
        axiosPublic.get('/users')
            .then(({ data }) => {
                const filterData = data.filter((singledata) => {
                    return userInfo.email !== singledata.email
                })
                setDatas(filterData)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const serachUser = (searchTxt) => {
        axiosPublic.get(`/users/${searchTxt}`)
            .then(({ data }) => {
                const filterData = data.filter((singledata) => {
                    return userInfo.email !== singledata.email
                })
                setDatas(filterData)
            })
    }



    const onSearch = (e) => {
        const txt = e.target.value;
        if (txt) {
            serachUser(txt);
        }
        else {
            fetchData();
        }
    };


    return (
        <div className="mx-w-7xl mx-auto px-4">
            <div className="md:grid grid-cols-1 md:grid-cols-5 lg:grid-cols-4 hidden">
                {/* large device handle */}
                <div className="lg:col-span-1 md:col-span-2 users-scroll bg-gray-50 h-screen overflow-y-auto p-1 shadow-xl border-r border-r-gray-200">
                    <div className="flex items-center gap-x-3 p-4 sticky top-0">
                        <div className="avatar online">
                            <div className="w-12">
                                <img className="h-12 w-12 rounded-full" src={userInfo.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                            </div>
                        </div>

                        <Search
                            allowClear
                            placeholder="search name"
                            // onSearch={onSearch}
                            onChange={onSearch}
                        />

                    </div>
                    <img className="h-32 mx-auto -mt-2" src={chatPhoto} alt="chat photo" />
                    <div className="border-t border-t-gray-200 rounded-b-2xl">
                        {
                            loading ? <div className="space-y-5 px-3 mt-5">
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>

                            </div> : <div>
                                {
                                    datas.map((data) => {
                                        return <div key={data._id} className="flex flex-col gap-y-10">
                                            <ChatUser data={data}></ChatUser>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>

                {/* mobile device handle */}
                <div className="md:col-span-3 lg:col-span-3 bg-[url('https://cdn.wallpapersafari.com/28/79/p75Yz0.jpg')]">
                    {
                        navigation.state === 'loading' ? <div className="min-h-[90vh] flex justify-center items-center">
                            <Spin
                                size='large'
                                indicator={
                                    <LoadingOutlined
                                        style={{
                                            fontSize: 40,
                                            fontWeight: 'bold'
                                        }}
                                        spin
                                    />
                                }
                            />

                        </div> : <Outlet></Outlet>
                    }

                </div>
            </div>
            <div className="md:hidden">
                <div className="lg:col-span-1 bg-gray-50 h-screen overflow-y-auto p-1 shadow-xl border-r border-r-gray-200">
                    <div className="flex items-center gap-x-3 p-4">
                        <div className="avatar online">
                            <div className="w-12">
                                <img className="h-12 w-12 rounded-full" src={userInfo.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                            </div>
                        </div>
                        <Search
                            allowClear
                            placeholder="input search text"
                            onSearch={onSearch}
                        />
                    </div>
                    <img className="h-32 mx-auto -mt-2" src={chatPhoto} alt="chat photo" />
                    <div className="border-t border-t-gray-200 rounded-b-2xl">
                        {
                            loading ? <div className="space-y-5 px-3 mt-5">
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>
                                <div className="flex gap-x-5 items-center">
                                    <Skeleton.Avatar loading={loading} active={true} size={'large'} shape={'circle'} />
                                    <div className="flex flex-col gap-y-2">
                                        <Skeleton.Input loading={loading} active={true} size={'large'} block />
                                        <Skeleton.Input loading={loading} active={true} size={'small'} block />
                                    </div>
                                </div>

                            </div> : <div>
                                {
                                    datas.map((data) => {
                                        return <div key={data._id} className="flex flex-col gap-y-10">
                                            <NavLink to={`/mchat/${data._id}`} className={({ isActive }) => isActive ? " flex flex-row gap-x-2 items-center p-3 shadow-lg bg-gray-200 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-gray-200 my-1" : "flex flex-row gap-x-2 items-center p-3 border-b border-b-gray-200 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-gray-200 my-1"
                                            }>
                                                <img className="h-12 w-12 rounded-full" src={data.photoUrl !== null ? `${data.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                <h2 className="text-lg font-medium text-gray-700">{data.name}</h2>

                                            </NavLink>
                                        </div>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ChatHome;