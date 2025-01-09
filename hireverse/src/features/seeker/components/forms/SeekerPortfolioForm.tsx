import { uploadToCloudinary } from "@core/api/external/cloudinaryApi";
import { createSeekerPortfolio, deleteSeekerPortfolio, updateSeekerPortfolio } from "@core/api/seeker/portfolioApi";
import ImageUploader from "@core/components/ui/ImageUploader";
import { SeekerPortfolio } from "@core/types/seeker.interface";
import { Box, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from 'yup';

type SeekerPortfolioFormProps = {
    portfolio?: SeekerPortfolio | null;
    onAdded?: (education: SeekerPortfolio) => void;
    onUpdated?: (education: SeekerPortfolio) => void;
    onDeleted?: (education: SeekerPortfolio) => void;
};

const SeekerPortfolioFormSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    mediaLink: Yup.string().url('Invalid URL format').required('Media Link is required'),
});

const SeekerPortfolioForm = ({ portfolio, onAdded, onUpdated, onDeleted }: SeekerPortfolioFormProps) => {
    const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
    const [portfolioImagePreview, setPortfolioImagePreview] =  useState<string | undefined>(portfolio?.thumbnail);
    const [deleting, setDeleting] = useState<boolean>(false);

    const handleImageChange = (image: File | null) => {
        if (image) {
            setPortfolioImage(image);
            const reader = new FileReader();
            reader.onloadend = () => setPortfolioImagePreview(reader.result as string);
            reader.readAsDataURL(image);
        }
    };

    const handleSubmit = async (
        values: any,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }
    ) => {
        try {
            const thumbnail = portfolioImage ? await uploadToCloudinary(portfolioImage) : portfolio?.thumbnail;

            if (portfolio) {
                const updatedPortfolio = await updateSeekerPortfolio(portfolio.id, {...values, thumbnail});
                onUpdated?.(updatedPortfolio);
                toast.success("Portfolio updated successfully!");
            } else {
                const newPortfolio = await createSeekerPortfolio({...values, thumbnail});
                onAdded?.(newPortfolio);
                toast.success("Portfolio added successfully!");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (portfolio: SeekerPortfolio) => {
        setDeleting(true);
        try {
            await deleteSeekerPortfolio(portfolio.id);
            toast.info("Portfolio deleted successfully!!");
            onDeleted?.(portfolio);
        } catch (error) {
            toast.error("Failed to delete portfolio.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Formik
            initialValues={{
                title: portfolio?.title || "",
                mediaLink: portfolio?.mediaLink || "",
            }}
            validationSchema={SeekerPortfolioFormSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    {/*Form Title */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h6" fontWeight="bold">
                            Portfolio
                        </Typography>
                    </Box>

                    {/* Display the portfolio image preview or default image */}
                    <Box
                        sx={{
                            position: "relative",
                            height: 200,
                            width: "100%",
                            background: portfolioImagePreview
                                ? `url(${portfolioImagePreview}) no-repeat center center/cover`
                                : "#d1d1d1",
                            borderRadius: 2,
                            mb: 2,
                        }}
                    >
                        {!portfolioImagePreview && (
                            <Typography variant="body2" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>
                                No portfolio thumbnail
                            </Typography>
                        )}
                    </Box>

                    <ImageUploader onChange={handleImageChange} maxSize={{width: 200, height: 200}} />

                    {/* Title */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Title
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="title"
                            variant="outlined"
                            placeholder="Enter your title"
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                        />
                    </Box>

                    {/* Media Link */}
                    <Box mb={3}>
                        <Typography variant="body1" fontWeight={500} mb={1}>
                            Media Link
                        </Typography>
                        <Field
                            as={TextField}
                            fullWidth
                            name="mediaLink"
                            variant="outlined"
                            placeholder="Enter media link"
                            error={touched.mediaLink && !!errors.mediaLink}
                            helperText={touched.mediaLink && errors.mediaLink}
                        />
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "center",
                        gap: 3,
                        mb: { xs: 3, sm: 0 },
                    }}>
                        {/* Delete Button */}
                        {portfolio && (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                size="large"
                                onClick={() => handleDelete(portfolio)}
                                disabled={isSubmitting || deleting}
                            >
                                Delete Portfolio
                            </Button>
                        )}

                        {/* Save Button */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            disabled={isSubmitting || deleting}
                        >
                            {isSubmitting ? <CircularProgress size={20} /> : "Save"}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SeekerPortfolioForm;
