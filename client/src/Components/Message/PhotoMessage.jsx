import { Button, Modal } from "antd";
import { useState } from "react";
import { MessageBox } from "react-chat-elements";
import { FaCloudArrowDown } from "react-icons/fa6";
// import DownloadFile from "../DownloadFile/DownloadFile";


const PhotoMessage = ({ msg, userInfo, loderData }) => {
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        imgUrl: null,
        fileName: null,
    })

    const clickImg = async (e) => {
        const imgUrl = e.target.src;
        const urlArray = imgUrl.split('/');
        urlArray.splice(6, 0, 'fl_attachment');
        const result = await urlArray.join('/');

        setModalInfo({
            isOpen: true,
            imgUrl: e.target.src,
            downloadUrl: result,
        })
    }

    const cencelModal = () => {
        setModalInfo({ imgUrl: null, isOpen: false, fileName: null })
    }



    return (
        <>
            <MessageBox key={msg._id}
                position={msg?.sender?.email == userInfo.email ? "right" : 'left'}
                type={msg?.msg?.type}
                title={msg?.sender?.email == userInfo.email ? userInfo.displayName : loderData.data.name}
                data={{
                    uri: msg?.msg?.message?.url,
                    height: 180,
                    width: 180,
                    alt: 'image',
                }}
                onOpen={clickImg}
                date={new Date(msg.time)}
                avatar={msg?.sender?.email == userInfo.email ? userInfo.photoURL : loderData.data.photoUrl}
                status={'read'}
            />


            {
                modalInfo.isOpen && <Modal
                    title="Web Chats"
                    open={modalInfo.isOpen}
                    onOk={cencelModal}
                    onCancel={cencelModal}
                    okButtonProps={{ style: { display: 'none' } }}
                    centered>

                    <img className="mx-auto my-3 " src={modalInfo?.imgUrl} alt="image" />
                    <span className="flex -mb-11">

                        <a href={modalInfo?.downloadUrl}>
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