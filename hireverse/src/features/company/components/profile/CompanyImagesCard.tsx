import { useState } from 'react';
import AddButton from '@core/components/ui/AddButton';
import EditButton from '@core/components/ui/EditButton';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteButton from '@core/components/ui/DeleteButton';
import CustomDialog from '@core/components/ui/CustomDialog';
import CompanyWorksplaceImageForm from '../forms/CompanyWorksplaceImageForm';
import { removeWorksplaceImage } from '@core/api/company/profileApi';
import { toast } from 'sonner';
import CircularProgress from '@mui/material/CircularProgress'; 

type CompanyImagesCardProps = {
    mode: 'read' | 'edit';
    companyName: string;
    images: string[];
    onImageRemove?: (imageUrl: string) => void;
}

export default function CompanyImagesCard({
    mode,
    companyName,
    images,
    onImageRemove
}: CompanyImagesCardProps) {
    const [deletable, setDeletable] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({}); 

    const toggleDelete = () => {
        setDeletable(!deletable);
    };

    const handleAdd = () => {
        setModelOpen(true);
    };

    const handleModelClose = () => setModelOpen(false);

    const handleImageAddSucces = () => {
        handleModelClose();
    };

    const handleRemoveImage = async (imageUrl: string) => {
        setLoadingImages((prevState) => ({
            ...prevState,
            [imageUrl]: true, 
        }));

        try {
            await removeWorksplaceImage({image: imageUrl});
            onImageRemove?.(imageUrl);
        } catch (error) {
            toast.error("Failed to remove image");
        } finally {
            setLoadingImages((prevState) => ({
                ...prevState,
                [imageUrl]: false, 
            }));
        }
    };

    return (
        <Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={700}>
                    Working at {companyName}
                </Typography>

                {mode === 'edit' && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                    }}>
                        <AddButton onClick={handleAdd} color='primary' />
                        {deletable ? <DeleteButton onClick={toggleDelete} color='primary' /> : <EditButton onClick={toggleDelete} color="primary" />}
                    </Box>
                )}
            </Box>

            <Box sx={{
                height: 450, overflowY: 'scroll',
                "&::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#E0DFFF",
                    borderRadius: "8px",
                    backgroundClip: "padding-box",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#8A89D0",
                },
            }}>
                {images.length > 0 ? (
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {images.map((image) => (
                            <ImageListItem key={image} sx={{ position: "relative" }}>
                                <img
                                    srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${image}?w=248&fit=crop&auto=format`}
                                    alt="workplace-image"
                                    loading="lazy"
                                />
                                {deletable && (
                                    <IconButton
                                        size='small'
                                        sx={{
                                            position: 'absolute',
                                            top: 6,
                                            right: 6,
                                            color: 'white',
                                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            }
                                        }}
                                        onClick={() => handleRemoveImage(image)}
                                        disabled={loadingImages[image]} 
                                    >
                                        {loadingImages[image] ? (
                                            <CircularProgress size={24} color="inherit" /> 
                                        ) : (
                                            <CloseIcon />
                                        )}
                                    </IconButton>
                                )}
                            </ImageListItem>
                        ))}
                    </ImageList>
                ) : (
                    <Typography>Add Your workplace image</Typography>
                )}
            </Box>

            {/* Form */}
            {mode === "edit" && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <CompanyWorksplaceImageForm onSucces={handleImageAddSucces} />
                </CustomDialog>
            )}
        </Box>
    );
}
