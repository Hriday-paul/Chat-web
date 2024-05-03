import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useGerSearchUserQuery } from "../../../Redux/Features/Api/Api";
import { MdErrorOutline } from "react-icons/md";
import SearchUser from "../../Ui/SearchUser/SearchUser";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

const SearchModal = ({closeModal} : {closeModal : ()=>void}) => {
    const [searchText, setSearchText] = useState<string>('');
    const {email} = useSelector((state:RootState)=>state.user)
    const { data, isError, isSuccess } = useGerSearchUserQuery({ searchTxt: searchText, me : email })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const txt = e.target.value;
        setSearchText(txt)
    }

    return (
        <div>
            <div>
                <div className="w-full mx-auto rounded-xl bg-transparent text-gray-800 relative overflow-hidden">
                    <div className="relative mt-1 p-5 py-10 md:p-10">

                        <div className="relative w-full">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                <IoSearchOutline className="text-gray-500 text-2xl"></IoSearchOutline>
                            </span>

                            <input value={searchText} onChange={handleSearch} autoFocus type="search" name="q" className="py-3 text-sm text-white bg-white/5 rounded-md pl-10 pr-2 focus:outline-none w-full" placeholder="name, email, phone..." />
                        </div>

                        <div className="flex flex-col gap-4 lg:p-4 p-2  rounde-lg m-2">

                            <div className="lg:text-2xl md:text-xl text-lg lg:p-3 p-1 font-black text-gray-200">Search Your Friend</div>

                            {
                                    isError
                                        ?
                                        <div>
                                            <div className="flex justify-center items-center mb-5 min-h-90">
                                                <div className="space-y-2">
                                                    <MdErrorOutline className="text-3xl md:text-4xl lg:text-6xl text-white text-center mx-auto" />
                                                    <h1 className="text-base md:text-xl lg:text-2xl text-white text-center ">Something Wrong</h1>
                                                    <p className="text-xs md:text-sm lg:text-base text-center text-gray-300">Check your internet connection & try again</p>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        isSuccess && data?.map((user) => {
                                            return <div key={user._id}><SearchUser 
                                            user={user}
                                            closeModal={closeModal}
                                             /></div>
                                        })
                            }

                        </div>
                    </div>


                    <div className="absolute top-0 left-0 w-full h-2 flex">
                        <div className="h-2 bg-blue-500 flex-1"></div>
                        <div className="h-2 bg-red-500 flex-1"></div>
                        <div className="h-2 bg-yellow-500 flex-1"></div>
                        <div className="h-2 bg-blue-500 flex-1"></div>
                        <div className="h-2 bg-green-500 flex-1"></div>
                        <div className="h-2 bg-red-500 flex-1"></div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default SearchModal;