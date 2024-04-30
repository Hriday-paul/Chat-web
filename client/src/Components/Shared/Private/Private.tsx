import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { SyncOutlined } from '@ant-design/icons';
import { auth } from '../../../../firebase.init';
import { AppDispatch, RootState } from '../../../Redux/Store';
import { addUser } from '../../../Redux/Features/UserSlice/UserSlice';
import { Spin } from 'antd';
import { SocketConnectContext } from '../../../ContextHandler/SocketContext/SocketContext';
import { io } from 'socket.io-client';
import { baseUrl } from '../../../Hooks/UseAxiosPublic/UseAxiosPublic';

function Private({ children }: { children: React.ReactNode }) {
    const [isLoading, setLoading] = useState(true);
    const {setSocket} = useContext(SocketConnectContext) || {socket : '', setSocket : ()=>{}}
    const location = useLocation();
    const {isAuthonicated} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(addUser({ name: currentUser.displayName || '', email: currentUser.email || '', photo: currentUser.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU', uId : currentUser.uid || '' }))
                setLoading(false);
                setSocket(io(baseUrl))
            } else {
                setLoading(false);
            }
        })
        return () => {
            unsubscribe()
        }
    }, [dispatch])


    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center bg-[#1B1A18]">
            <Spin indicator={<SyncOutlined style={{ fontSize: 40 }} spin />} />
        </div>
    }

    else if (isAuthonicated) {
        return children;
    }

    return <Navigate state={{ from: location.pathname }} to="/login" replace></Navigate>
}

export default Private