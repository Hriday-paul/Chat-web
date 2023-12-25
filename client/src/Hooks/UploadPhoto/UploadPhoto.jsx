import axios from "axios";

const UploadPhoto = (imgData) => {
    return axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_UPLOAD_PHOTO_KEY}`, { image: imgData }, {
        headers: {
            'content-Type': 'multipart/form-data'
        }
    })
};

export default UploadPhoto;