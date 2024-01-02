import axios from "axios"
const axiosPublic = axios.create({
    baseURL: 'https://chat-web-342z.onrender.com',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosPublic
  )
}


export default UseAxiosPublic;