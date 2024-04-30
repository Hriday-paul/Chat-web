import chatPhoto from "../../../public/chat-logo-design_93835-108-removebg-preview.png"
import { Link } from "react-router-dom";
import { FaRegPaperPlane } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            <div className=" bg-[url('https://res.cloudinary.com/devlj6p7h/image/upload/v1713854002/test/y7b7exyrvq3td2ig6aju.avif')] bg-no-repeat bg-cover">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex justify-between items-center py-2">
                        <img className="h-10 md:h-14 lg:h-16 w-10 md:w-14 lg:w-16" src={chatPhoto} alt="logo" />

                        <Link to='/login' className="relative items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group">
                            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-transparent opacity-[3%]"></span>
                            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-sky-500 opacity-100 group-hover:-translate-x-8"></span>
                            <span className="relative w-full text-left text-sky-500 transition-colors duration-200 ease-in-out group-hover:text-white">Login Now</span>
                            <span className="absolute inset-0 border-2 border-sky-500 rounded-full"></span>
                        </Link>
                    </nav>
                    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-80px)]">
                        <div className="text-center mx-auto w-full md:w-3/5">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-100 mb-2">
                                SEND MESSAGE FAST <span className="text-transparent bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-5xl lg:text-6xl font-bold text-center">&</span> QUECKLY
                            </h2>


                            <p className="text-base md:text-lg lg:text-xl text-gray-300 my-2 text-center w-3/5 mx-auto mb-5">Connect effortlessly with friends and family through our intuitive chat application.</p>

                            <Link to='/chat' className="inline-flex items-center px-4 py-2 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-sky-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0 sm:w-auto hover:bg-sky-700 hover:border-sky-700 hover:text-white focus-within:bg-sky-700 focus-within:border-sky-700">
                                {"Let's Started"}
                                <FaRegPaperPlane className="text-white text-base ml-2"></FaRegPaperPlane>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;