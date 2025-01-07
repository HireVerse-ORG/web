import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const cld = new Cloudinary({
    cloud: {
        cloudName: CLOUD_NAME,
    },
});

export const uploadToCloudinary = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        
        const response = await axios.post(UPLOAD_URL, formData);

        return response.data.secure_url; 
    } catch (error: any) {
        throw new Error("Failed to upload file");
    }
};

/**
 * Generate a transformed Cloudinary image URL
 * @param publicId - The public ID of the uploaded image
 * @returns A Cloudinary image instance with transformations applied
 */
export const getTransformedImage = (publicId: string) => {
    return cld.image(publicId).resize(auto().gravity(autoGravity()));
};
