import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const RESUME_PRESET = import.meta.env.VITE_CLOUDINARY_RESUME_PRESET;
const BASE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload
 * @param resourceType - The resource type ('image' or 'raw'). Default is 'image'.
 * @returns The secure URL of the uploaded file
 */
export const uploadToCloudinary = async (
    file: File,
    resourceType: 'image' | 'raw' = 'image' 
): Promise<string> => {
    try {
        const UPLOAD_URL = `${BASE_UPLOAD_URL}/${resourceType}/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        const response = await axios.post(UPLOAD_URL, formData);
        console.log(response);
        
        return response.data.secure_url; 
    } catch (error: any) {
        console.log(error);
        throw new Error("Failed to upload file");
    }
};


export const cloudinaryResumeUploader = async (
    file: File,
): Promise<string> => {
    try {
        const UPLOAD_URL = `${BASE_UPLOAD_URL}/image/upload`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', RESUME_PRESET);

        const response = await axios.post(UPLOAD_URL, formData);
        
        return response.data.secure_url; 
    } catch (error: any) {
        throw new Error("Failed to upload file");
    }
};
