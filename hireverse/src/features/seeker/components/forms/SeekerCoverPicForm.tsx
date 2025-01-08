import { updateSeekerProfile } from "@core/api/seeker/profileApi";
import ImageUploader from "@core/components/ui/ImageUploader";
import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";

type SeekerCoverPicForm = {
  initialImageUrl?: string;
  onSucces?: (newCoverImage: string) => void;
};

const SeekerCoverPicForm = ({ initialImageUrl, onSucces }: SeekerCoverPicForm) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | undefined>(initialImageUrl);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleImageChange = (image: File | null) => {
    if (image) {
      setCoverImage(image);
      const reader = new FileReader();
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(image);
    }
  };

  const handleCoverPicSubmit = async () => {
    if (coverImage) {
      setSubmitting(true);
      try {
        const uploadedCover = await uploadToCloudinary(coverImage);
        await updateSeekerProfile({ coverImage: uploadedCover });
        onSucces?.(uploadedCover);
        toast.success("Cover pic updated")
      } catch (error) {
        toast.error("Failed to update cover image");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Update Cover Picture
      </Typography>
      
      {/* Display the cover image preview or default image */}
      <Box
        sx={{
          position: "relative",
          height: 200,
          width: "100%",
          background: coverImagePreview
            ? `url(${coverImagePreview}) no-repeat center center/cover`
            : "#d1d1d1",
          borderRadius: 2,
          mb: 2,
        }}
      >
        {!coverImagePreview && (
          <Typography variant="body2" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
            No cover photo
          </Typography>
        )}
      </Box>
      
      <ImageUploader onChange={handleImageChange} />
      
      {/* Submit button */}
      {coverImage && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleCoverPicSubmit}
          sx={{ mt: 2 }}
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={20} /> : "Save Cover Picture"}
        </Button>
      )}
    </Box>
  );
};

export default SeekerCoverPicForm;
