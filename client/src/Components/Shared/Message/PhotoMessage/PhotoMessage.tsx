import { Button, Modal } from "antd";
import { useState } from "react";
import { FaCloudArrowDown } from "react-icons/fa6";
import { userType } from "../../../../Redux/Features/Api/Api";
import { messageType } from "../../../Ui/ChatBoxMessages/ChatBoxMessages";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/Store";
import { RiCheckDoubleLine } from "react-icons/ri";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { MdOutlineDeleteOutline, MdOutlineReply } from "react-icons/md";


const PhotoMessage = ({ msg, frData }: { msg: messageType; frData: userType }) => {
    const { name: myName, email: myEmail, photo: myPhoto } = useSelector((state: RootState) => state.user);

    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        imgUrl: '',
        downloadUrl: ''
    })

    const clickImg = async (e: React.MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement; // Explicitly cast e.target to HTMLImageElement
        const imgUrl = target.src;
        const urlArray = imgUrl.split('/');
        urlArray.splice(6, 0, 'fl_attachment');
        const result = await urlArray.join('/');

        setModalInfo({
            isOpen: true,
            imgUrl: target.src, // Use target.src instead of e.target.src
            downloadUrl: result,
        });
    };

    // const items: MenuProps['items'] = [
    //     {
    //         label: 'Reply',
    //         key: '1',
    //         icon: <MdOutlineReply style={{ fontSize: '15px' }} />
    //     },
    //     {
    //         label: 'Delete',
    //         key: '2',
    //         icon: <MdOutlineDeleteOutline style={{ fontSize: '15px', color: 'orange' }} />
    //     },
    // ];

    // const onClick: MenuProps['onClick'] = ({ key }) => {
    //     alert(`Click on item ${key}`);
    // };


    const cencelModal = () => {
        setModalInfo({ imgUrl: '', isOpen: false, downloadUrl: '' })
    }


    return (
        <>
            <div className={`flex ${msg?.sender?.email == myEmail ? "justify-end" : ''}`}>
                <div className="flex items-start my-5 gap-2">
                    <img className={`w-8 h-8 rounded-full ${msg?.sender?.email == myEmail ? "order-3" : 'order-1'}`} src={msg?.sender?.email == myEmail ? myPhoto : frData.photoUrl} alt="profile image" />

                    <div className={`flex flex-col w-full  max-w-[320px] leading-1.5 p-4 border-gray-200 bg-[#0B1114] order-2 ${msg?.sender?.email == myEmail ? "rounded-s-xl rounded-es-xl" : 'rounded-e-xl rounded-es-xl'}`}>
                        <div>
                            <h4 className="text-sm font-medium text-gray-400">{msg?.sender?.email == myEmail ? myName : frData.name}</h4>
                        </div>

                        {/* <img className="" src={msg?.msg?.message?.url} alt="image" /> */}
                        <div className="group relative my-2.5">
                            <img loading="lazy" onClick={clickImg} src={msg?.msg?.message?.url} className="rounded-lg max-h-40 h-full w-auto cursor-pointer" />
                        </div>

                        <div className='flex flex-row items-center justify-end gap-x-2'>
                            <span className="text-xs font-normaltext-gray-400">{new Date(msg?.time).getDate() + '-' + (new Date(msg?.time).getMonth() + 1) + '-' + new Date(msg?.time).getFullYear()}</span>
                            <RiCheckDoubleLine className="text-sm text-green-500"></RiCheckDoubleLine>
                        </div>
                    </div>

                    <div className={`hidden inline-flex self-center items-center p-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none text-white bg-[#0B1114] hover:bg-gray-900 focus:ring-gray-600 cursor-pointer ${msg?.sender?.email == myEmail ? "order-1" : 'order-3'}`}>
                        {/* <Dropdown
                            menu={{ items, onClick }}
                            trigger={['click']}
                            placement={msg?.sender?.email == myEmail ? "bottomRight" : 'bottomLeft'}
                            arrow={{
                                pointAtCenter: true,
                            }}
                        >
                            <span onClick={(e) => e.preventDefault()}>
                                <BsThreeDotsVertical className='text-lg text-white' />
                            </span>
                        </Dropdown> */}
                    </div>
                </div>


            </div>


            {
                modalInfo.isOpen && <Modal
                    title="Web Chats"
                    style={{ backgroundColor: 'black' }}
                    open={modalInfo.isOpen}
                    onOk={cencelModal}
                    onCancel={cencelModal}
                    okButtonProps={{ style: { display: 'none' } }}
                    centered>

                    <img className="mx-auto my-3 " src={modalInfo?.imgUrl || ''} alt="image" />
                    <span className="flex -mb-11">

                        <a href={modalInfo?.downloadUrl || ''}>
                            <Button type="primary" icon={<FaCloudArrowDown className="text-sm" />}>
                                Download
                            </Button>
                        </a>

                    </span>
                </Modal>
            }


        </>

    );
};

export default PhotoMessage;