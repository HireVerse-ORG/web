import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import DocUploader from "@core/components/ui/DocUploader";

type OfferLetterFormProps = {
  onSubmit: (offerLetter: File) => void;
  onCancel: () => void;
};

const OfferLetterForm: React.FC<OfferLetterFormProps> = ({ onSubmit, onCancel }) => {
  const [offerLetter, setOfferLetter] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setOfferLetter(file);
      setError(null);
    }
  };

  const handleSubmit = () => {
    if (offerLetter) {
      onSubmit(offerLetter);
    } else {
      setError("Please upload an offer letter.");
    }
  };

  return (
    <Box mb={3}>
      <DocUploader onFileUpload={handleFileUpload} error={error || ""} />
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default OfferLetterForm;
