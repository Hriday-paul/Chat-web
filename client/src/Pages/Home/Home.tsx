import { Link } from "react-router-dom";
import { BsChatDots } from "react-icons/bs";

const Home = () => {
    return (
        <div >
            {/* <div className=" bg-[url('https://res.cloudinary.com/devlj6p7h/image/upload/v1713854002/test/y7b7exyrvq3td2ig6aju.avif')] bg-no-repeat bg-cover">
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
            </div> */}

            <div className=" bg-[url('https://res.cloudinary.com/devlj6p7h/image/upload/v1713854002/test/y7b7exyrvq3td2ig6aju.avif')] bg-no-repeat bg-cover min-h-screen flex flex-col justify-center items-center">
                <div className="relative py-12 flex w-full flex-col items-center sm:pt-24">
                    <Link to='/' rel="noreferrer"
                        className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-all hover:bg-blue-200">
                        <BsChatDots className="text-lg text-blue-500" />
                        <p className="text-sm font-semibold text-[#1d9bf0]">Chat web</p>
                    </Link>
                    <h1
                        className="mt-8 max-w-sm bg-gradient-to-br from-gray-500 via-teal-500 to-gray-500 bg-clip-text text-center text-4xl font-extrabold text-transparent sm:max-w-4xl sm:text-6xl">
                        SEND MESSAGE FAST <span className="text-transparent bg-gradient-to-r from-sky-400 to-blue-700 bg-clip-text text-5xl lg:text-6xl font-bold text-center">&</span> QUECKLY
                    </h1>
                    <span className="mt-8 max-w-lg text-center text-xl leading-relaxed text-gray-200">
                        Connect effortlessly with friends and family through our intuitive chat application.
                    </span>
                    <p className="mt-3 rounded border px-3 py-1 shadow">
                        🎁 <span className="text-accent font-semibold">Totally free</span> for the any users !
                    </p>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-0 sm:gap-x-4">
                        <Link to='/chat'
                            className="flex flex-row items-center justify-center gap-x-2 rounded-lg text-white px-10 py-3 bg-teal-500">
                            <svg className="h-[30px] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
                                stroke-width="3" stroke="#000000" fill="none">
                                <path d="M14,39.87,24.59,50.51s33-14,31.23-42.29C55.82,8.22,29.64,4.28,14,39.87Z"></path>
                                <path d="M44.69,9.09a12.3,12.3,0,0,0,3.48,6.73,12.31,12.31,0,0,0,7,3.52"></path>
                                <circle cx="39.46" cy="24.56" r="6.2"></circle>
                                <path d="M14.89,37.82l-5.3.68a.27.27,0,0,1-.28-.37l3.93-9a2.65,2.65,0,0,1,1.88-1.53l6.59-1.38"></path>
                                <path d="M26.55,49.4l-.69,5.3a.27.27,0,0,0,.37.28l9-3.92a2.69,2.69,0,0,0,1.53-1.89l1.38-6.59"></path>
                                <path d="M22.21,48.13c-2.37,7.41-14.1,7.78-14.1,7.78S8,44.51,15.76,41.67"></path>
                            </svg>
                            Get Started Now
                        </Link>
                        <Link to='/login'
                            className="hover:bg-teal-500 hover:text-white focus:outline-none focus:ring flex flex-row items-center justify-center gap-x-2 rounded-lg border border-teal-500 px-10 py-3 text-teal-500">Login →
                        </Link>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;