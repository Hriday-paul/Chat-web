
import axios from "axios"

const axiosPublic = axios.create({
    baseURL: 'http://localhost:4000',
    // withCredentials : true,
})
function UseAxiosPublic() {
  return (
    axiosPublic
  )
}


export default UseAxiosPublic;