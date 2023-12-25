import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../../firebase.config"
import { io } from 'socket.io-client';
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";

export const authContext = createContext(null);

const Autthonicate = ({ children }) => {
    const URL = 'http://localhost:4000';
    const [userInfo, setUserInfo] = useState({});
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);
    const provider = new GoogleAuthProvider();
    const axiosPublic = UseAxiosPublic();

    const creatUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
        setSocket(io(URL))
    }, [])



    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //             axiosPublic.get(`/myInfo/${currentUser.email}`)
    //                 .then(({ data }) => {
    //                     setCurrentUser(data)
    //                     setSocket(io(URL))
    //                     setUserInfo(currentUser)
    //                     setLoading(false)
    //                 })
    //         }
    //     })
    //     return () => {
    //         unsubscribe()
    //     }
    // }, [])


    const authInfo = {
        setUserInfo,
        userInfo,
        loading,
        creatUser,
        loginUser,
        googleLogin,
        logOutUser,
        socket,
        currentUser
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Autthonicate;