import { useEffect, useRef, useState } from "react";
import { Button, Box, CircularProgress, Typography, Alert } from "@mui/material";
import QuillEditor from "@core/components/ui/QuillEditor";
import Quill from "quill";
import { sanitizeHtml } from "@core/utils/helper";
import { updateSeekerProfile } from "@core/api/seeker/profileApi";

type SeekerBioFormProps = {
    bio?: string | null;
    onSuccess?: (bio: string) => void;
}

const SeekerBioForm = ({ bio, onSuccess }: SeekerBioFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null); 
    const quillRef = useRef<Quill | null>(null);

    const toolbarOptions = [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ];

    useEffect(() => {
        if (quillRef.current && bio) {
            quillRef.current.clipboard.dangerouslyPasteHTML(bio);
        }
    }, [bio]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null); 

        try {
            const textContent = quillRef.current?.getText();
            if (!textContent || textContent.trim().length === 0) {
                setError("Bio cannot be empty!"); 
                return;
            }

            const content = sanitizeHtml(quillRef.current?.getSemanticHTML() || "");
            console.log("Submitted Bio:", content);
            await updateSeekerProfile({bio: content});
            onSuccess?.(content);
        } catch (error) {
            setError("There was an error submitting your bio.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                About Me
            </Typography>

            <Box mb={2}>
                {/* Quill editor container */}
                <QuillEditor
                    ref={quillRef}
                    modules={{
                        toolbar: toolbarOptions,
                    }}
                    placeholder="Write about yourself"
                    style={{ height: "200px" }}
                    maxLength={300}
                />
            </Box>

            {/* Display error message above the submit button */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={20} /> : "Save"}
            </Button>
        </Box>
    );
};

export default SeekerBioForm;
