import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadOnClouinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload file on cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        //file has uploaded successfully
        console.log("file uploaded successfully on cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the uploadoperation got failed
        console.error("Error occurred while uploading file on cloudinary", error);
    }
}

export { uploadOnClouinary };