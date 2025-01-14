import { Box, Typography, Button } from "@mui/material";
import { Email, Twitter, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import EditButton from "@core/components/ui/EditButton";

type ContactCardProps = {
    mode: "read" | "edit";
}

const ContactCard = ({ mode }: ContactCardProps) => {
    const contactLinks = [
        { icon: <Email />, label: "Email", href: "contact@company.com" },
        { icon: <Twitter />, label: "Twitter", href: "https://twitter.com/company" },
        { icon: <Facebook />, label: "Facebook", href: "https://facebook.com/company" },
        { icon: <Instagram />, label: "Instagram", href: "https://instagram.com/company" },
        { icon: <LinkedIn />, label: "LinkedIn", href: "https://linkedin.com/company" },
    ];

    return (
        <Box sx={{ position: "relative" }}>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2
            }}>
                <Typography variant="h6" fontWeight={700}>
                    Contact
                </Typography>

                {mode === "edit" && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                    }}>

                        <EditButton
                            // onClick={handleCoverPicEdit}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {contactLinks.map((link) => (
                    <Button
                        key={link.label}
                        variant="outlined"
                        href={link.href}
                        target="_blank"
                        startIcon={link.icon}
                        sx={{
                            justifyContent: "flex-start",
                            width: "max-content"
                        }}
                    >
                        {link.href}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default ContactCard;
