import { createContext, useState } from "react";

type SocketProps = {
    setSocket: React.Dispatch<React.SetStateAction<any>>;
    socket: any;
}

type childrenPropType = {
    children: React.ReactNode;
};

export const SocketConnectContext = createContext<SocketProps | null>(null);

const SocketContext = ({ children }: childrenPropType) => {
    const [socket, setSocket] = useState<any>("");

    const socketValue: SocketProps = {
        socket, 
        setSocket
    };

    return (
        <SocketConnectContext.Provider value={socketValue}>
            {children}
        </SocketConnectContext.Provider>
    );
};

export default SocketContext;