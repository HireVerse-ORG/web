import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

type DocViewerProps = {
  docUrl: string;
};

const DocViewer = ({ docUrl }: DocViewerProps) => {
  const [loadError, setLoadError] = useState(false); 
  const [retryKey, setRetryKey] = useState(0); 

  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(docUrl)}&embedded=true`;

  const handleRetry = () => {
    setLoadError(false); 
    setRetryKey((prev) => prev + 1); 
  };

  return (
    <Box sx={{ width: "100%", height: "500px", overflow: "auto", position: "relative" }}>
      {!loadError ? (
        <iframe
          key={retryKey} 
          src={googleDocsViewerUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          onError={() => setLoadError(true)} 
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Unable to load the document.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRetry}>
            Retry
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DocViewer;
