import { Box, Typography, Button, Skeleton } from "@mui/material";
import { Email, Twitter, Facebook, Instagram, LinkedIn, Phone } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";
import CustomDialog from "@core/components/ui/CustomDialog";
import { useState } from "react";
import ContactUpdateForm from "../forms/ContactUpdateForm";

type ContactCardProps = {
    mode: "read" | "edit";
    data?: {
        email?: string;
        twitter?: string;
        facebook?: string;
        linkedin?: string;
        instagram?: string;
        phone?: string;
    };
};

const ContactCard = ({ mode, data }: ContactCardProps) => {
    const [modelOpen, setModelOpen] = useState(false);

    const { email, facebook, twitter, instagram, linkedin, phone } = data || {};
    
    const contactLinks = [
        { icon: <Email />, label: "Email", href: email },
        { icon: <Phone />, label: "LinkedIn", href: phone },
        { icon: <Twitter />, label: "Twitter", href: twitter },
        { icon: <Facebook />, label: "Facebook", href: facebook },
        { icon: <Instagram />, label: "Instagram", href: instagram },
        { icon: <LinkedIn />, label: "LinkedIn", href: linkedin },
    ];

    const isLoading = !data;

    const handleModelClose = () => setModelOpen(false);

    const handleEdit = () => setModelOpen(true);
    const handleSuccess = () => handleModelClose();

    return (
        <Box sx={{ position: "relative" }}>
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                }}
            >
                <Typography variant="h6" fontWeight={700}>
                    Contact
                </Typography>

                {mode === "edit" && (
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <EditButton
                            onClick={handleEdit}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>

            {/* Contact Links */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {isLoading
                    ? Array(5)
                        .fill(0)
                        .map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={150}
                                height={40}
                                sx={{ borderRadius: 1 }}
                            />
                        ))
                    : contactLinks.map(
                        (link) =>
                            link.href && (
                                <Button
                                    key={link.label}
                                    variant="outlined"
                                    href={link.href}
                                    target="_blank"
                                    startIcon={link.icon}
                                    sx={{
                                        justifyContent: "flex-start",
                                        width: "max-content",
                                    }}
                                >
                                    {link.href}
                                </Button>
                            )
                    )}
            </Box>


            {/* Form */}
            {mode === "edit" && (
                <CustomDialog open={modelOpen} onClose={handleModelClose}>
                    <ContactUpdateForm data={data} onSuccess={handleSuccess}/>
                </CustomDialog>
            )}
        </Box>
    );
};

export default ContactCard;
