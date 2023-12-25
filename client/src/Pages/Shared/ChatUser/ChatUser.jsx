import { NavLink } from "react-router-dom";

const ChatUser = ({ data}) => {
    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('connected')
    //     });
    // }, [])

    // socket.on('disconnect', () => {
    //     console.log('disconnected')
    // });

    // const sendMsg = async(msg) => {
    //     const messageInfo = {
    //         msg : {type : 'txt', message : msg},
    //         sender : {
    //             name : data.name,
    //             email : data.email,
    //             id : data._id,
    //             photoUrl : data.photoUrl
    //         },
    //         receiver : '',
    //     }
    //     socket.emit('sendMessage', 'hi', 'wow')
    // }

    // socket.on('receive', (msg) => {
    //     console.log(msg)
    // })


    return (
        <NavLink to={`/chat/${data._id}`} className={({ isActive }) => isActive ? " flex flex-row gap-x-2 items-center p-3 shadow-lg bg-gray-200 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-gray-200 my-1" : "flex flex-row gap-x-2 items-center p-3 border-b border-b-gray-200 hover:shadow-lg duration-100 cursor-pointer rounded-md hover:bg-gray-200 my-1"
        }>
            <img className="h-12 rounded-full" src={data.photoUrl !== null ? `${data.photoUrl}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
            <h2 className="text-lg font-medium text-gray-700">{data.name}</h2>

        </NavLink>

    );
};

export default ChatUser;