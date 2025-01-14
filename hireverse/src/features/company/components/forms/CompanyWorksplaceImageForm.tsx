import { addWorksplaceImage } from "@core/api/company/profileApi";
import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import ImagePreviewer from "@core/components/ui/ImagePreviewer";
import ImageUploader from "@core/components/ui/ImageUploader";
import { useCompanyContext } from "@core/contexts/CompanyContext";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

type CompanyWorksplaceImageFormProps = {
    onSucces?: () => void;
}
const CompanyWorksplaceImageForm = ({onSucces}: CompanyWorksplaceImageFormProps) => {
    const {companyProfile, setCompanyProfile} = useCompanyContext();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageChange = (image: File | null) => {
        if (image) {
            setImage(image);
            setImagePreview(URL.createObjectURL(image));

            const img = new Image();
            img.onload = () => {
                const ratio = img.naturalWidth / img.naturalHeight;
                setAspectRatio(ratio);
            };
            img.src = URL.createObjectURL(image);
        }
    };

    const handleCropped = (croppedImage: File, url: string) => {
        setImage(croppedImage);
        setImagePreview(url);
    };

    const handleSubmit = async () => {
        if (!image) {
            return;
        }

        setLoading(true);

        try {
            const imageurl = await uploadToCloudinary(image);
            await addWorksplaceImage({image: imageurl});
            setCompanyProfile({
                ...companyProfile!,
                workplaceImages: [...companyProfile!.workplaceImages, imageurl]
            })
            onSucces?.();
        } catch (error) {
            toast.error("Failed to add image");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Box sx={{ pt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Add Workplace Image
            </Typography>

            <ImagePreviewer
                image={imagePreview}
                aspect={aspectRatio || 1}
                onCropped={handleCropped}
                styles={{
                    width: "auto",
                    height: "200px",
                    objectFit: "cover",
                }}
            />

            <ImageUploader onChange={handleImageChange} />

            <Box sx={{ mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading || !image} 
                    fullWidth
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                </Button>
            </Box>
        </Box>
    );
}

export default CompanyWorksplaceImageForm;
