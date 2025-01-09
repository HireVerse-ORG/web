import { updateSeekerProfile } from "@core/api/seeker/profileApi";
import ImageUploader from "@core/components/ui/ImageUploader";
import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import ImagePreviewer from "@core/components/ui/ImagePreviewer";

type SeekerCoverPicForm = {
  initialImageUrl?: string;
  onSucces?: (newCoverImage: string) => void;
};

const SeekerCoverPicForm = ({ initialImageUrl, onSucces }: SeekerCoverPicForm) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | File>(initialImageUrl || "");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleImageChange = (image: File | null) => {
    if (image) {
      setCoverImage(image);
      setCoverImagePreview(image);
    }
  };

  const handleCropped = (croppedImage: File, url: string) => {
    setCoverImage(croppedImage);
    setCoverImagePreview(url)
  }

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
      <ImagePreviewer image={coverImagePreview} aspect={4 / 1} onCropped={handleCropped} />
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
