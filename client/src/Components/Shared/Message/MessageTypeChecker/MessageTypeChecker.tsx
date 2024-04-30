import { userType } from "../../../../Redux/Features/Api/Api";
import { messageType } from "../../../Ui/ChatBoxMessages/ChatBoxMessages";
import PhotoMessage from "../PhotoMessage/PhotoMessage";
import VideoMessage from "../VideoMessage/VideoMessage";
import TextMsg from '../TextMsg/TextMsg'
import 'react-chat-elements/dist/main.css'


const MessageTypeChecker = ({ msg, frInfo }: { msg: messageType; frInfo: userType }) => {
    if (msg?.msg?.type == 'text') {
        return (
            <TextMsg msg={msg} frData={frInfo}/>
        );
    }
    else if (msg?.msg?.type == 'photo') {
        return (
            <PhotoMessage msg={msg} frData={frInfo} ></PhotoMessage>
        );
    }
    else if (msg?.msg?.type == 'video') {
        return (
            <VideoMessage msg={msg} frData={frInfo} ></VideoMessage>
        )
    }
};

export default MessageTypeChecker;