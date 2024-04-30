import axios from "axios"

export const baseUrl = 'https://chat-web-342z.onrender.com'
export const url = 'https://chat-web-342z.onrender.com/api'

const axiosPublic = axios.create({
    baseURL: url,
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosPublic
  )
}


export default UseAxiosPublic;