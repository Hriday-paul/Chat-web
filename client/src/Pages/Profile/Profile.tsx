import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase.init";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import { useAddOrUpdateUserMutation, useGetMyInfoQuery } from "../../Redux/Features/Api/Api";
import WidgetCloudinary from "../../Hooks/WidgetCloudinary/WidgetCloudinary ";
import { updateName, updatePhoto as updateStatePhoto } from "../../Redux/Features/UserSlice/UserSlice";

const Profile = () => {
    const [edit, setEdit] = useState({
        nameInput: false,
        phoneInput: false,
        passInput: false
    });
    const { email } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const { data: myInfo, isLoading, isError } = useGetMyInfoQuery({ email });
    const [updateUser, { isLoading: isUpdating, isError: updateError, isSuccess }] = useAddOrUpdateUserMutation();


    const updatePhoto = (url: string) => {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                photoURL: url,
            });
        }
        updateUser({ email: email, photoUrl: url })
        dispatch(updateStatePhoto({ photo: url }))
    }

    const reauthenticate = (currentPassword: string) => {
        const user = auth.currentUser;
        if (!user) {
            // Handle the case where currentUser is null, e.g., redirect to login page or display an error message.
            throw new Error("No user is currently authenticated.");
        }
        const credentials = EmailAuthProvider.credential(
            user.email || '', // Use an empty string as fallback if user.email is null
            currentPassword
        );
        return reauthenticateWithCredential(user, credentials);
    }

    const updateFirebase_Db = (name: string, newPassword: string, phone: string) => {
        if (auth.currentUser) updateProfile(auth.currentUser, {
            displayName: name,
        });
        const updateData = { name, password: newPassword, phone, email: email };
        updateUser(updateData);
        dispatch(updateName({ name }))
    }

    const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const newPassword = (form.elements.namedItem('password') as HTMLInputElement).value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;

        if (myInfo?.password !== newPassword && newPassword) {
            reauthenticate(myInfo?.password || '123')
                .then(() => {
                    auth.currentUser && updatePassword(auth.currentUser, newPassword)
                        .then(() => {
                            updateFirebase_Db(name, newPassword, phone);
                        })
                        .catch(() => {
                            toast.error('Something went wrong. Try again.');
                        });
                })
                .catch(() => {
                    toast.error('Something went wrong. Try again.');
                });
        } else {
            updateFirebase_Db(name, newPassword, phone);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen md:m-0 m-5">
                {(isLoading) ? <div>loading...</div> :
                    <div className="border-b-2 border-black block md:flex">
                        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-[#121C22] shadow-md">
                            <Link to='/chat' className="flex items-center gap-x-1 mb-3">
                                <IoHome className="text-sm text-gray-400"></IoHome>
                                <p className="text-sm text-gray-00">Home</p>
                            </Link>
                            <div className="flex justify-between">
                                <span className="text-xl font-semibold block text-gray-200">Your Profile</span>
                            </div>
                            <span className="text-gray-400">This information is secret so be careful</span>
                            <div className="w-full p-8 mx-2 flex justify-center">
                                
                                <WidgetCloudinary updatePhoto={updatePhoto}>
                                    <div className="relative group cursor-pointer">
                                        <img className="max-w-xs w-32 items-center border" src={myInfo?.photoUrl} alt="profile photo" />
                                        <div className="bg-blue-100 size-6 p-[3px] flex justify-center items-center absolute top-0 right-0 group-hover:w-full group-hover:h-full group-hover:top-0 group-hover:right-0 group-hover:bg-blue-100/60 duration-500 transition-all">

                                            <MdOutlineEdit className=" text-blue-500 group-hover:block text-xl cursor-pointer"></MdOutlineEdit>

                                        </div>
                                    </div>
                                </WidgetCloudinary>
                            </div>

                        </div>
                        <div className="w-full md:w-3/5 p-8 bg-[#121C22] lg:ml-4 shadow-md">
                            {
                                (updateError || isError) && <div className="p-3 text-orange-400">Something wrong, try again!</div>
                            }
                            {
                                (isSuccess) && <div className="p-3 text-green-500">Update successfully</div>
                            }
                            <form onSubmit={updateHandler} className="rounded shadow p-6">
                                <div className="pb-3">
                                    <label htmlFor="name" className="font-semibold text-gray-300 block pb-1">Name</label>
                                    <div className="flex group">
                                        <input disabled={!edit.nameInput} id="name" name="name" className="border-1  rounded-r px-4 py-2 w-full text-gray-400" type="text" defaultValue={myInfo?.name} />
                                        <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, nameInput: true })}></MdOutlineEdit>
                                    </div>
                                </div>
                                <div className="pb-3">
                                    <label htmlFor="phone" className="font-semibold text-gray-300 block pb-1">Phone</label>
                                    <div className="flex group">
                                        <input disabled={!edit.phoneInput} id="phone" name="phone" className="border-1  rounded-r px-4 py-2 w-full text-gray-400" type="number" defaultValue={myInfo?.phone} />
                                        <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, phoneInput: true })}></MdOutlineEdit>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="font-semibold text-gray-300 block pb-1">Password</label>
                                    <div className="flex group">
                                        <input disabled={!edit.passInput} id="password" name="password" className="border-1 text-gray-400 rounded-r px-4 py-2 w-full" type="text" defaultValue={myInfo?.password} />
                                        <MdOutlineEdit className="-ml-4 hidden group-hover:block text-lg text-gray-400" onClick={() => setEdit({ ...edit, passInput: true })}></MdOutlineEdit>
                                    </div>
                                    {(edit.nameInput || edit.phoneInput || edit.passInput) &&
                                        <button type="submit" className="btn btn-sm btn-info w-full bg-blue-500 text-white hover:bg-blue-600 mt-4">
                                            Update
                                            {isUpdating && <span className="loading loading-spinner loading-xs"></span>}
                                        </button>
                                    }
                                    <span className="text-gray-400 pt-4 block opacity-70">Personal login information of your account</span>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
            <Toaster />
        </div>
    );
};

export default Profile;
