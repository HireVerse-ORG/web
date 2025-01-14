import AddButton from "@core/components/ui/AddButton";
import EditButton from "@core/components/ui/EditButton";
import { Box, Typography } from "@mui/material";

type CompanyBenifitListProps = {
    mode: "read" | "edit";
}

const CompanyBenifitList = ({mode}: CompanyBenifitListProps) => {
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
                    Benifits
                </Typography>

                {mode === "edit" && (
                    <Box sx={{
                        display: "flex",
                        gap: 2,
                    }}>

                        <AddButton color='primary' />
                        <EditButton
                            // onClick={handleCoverPicEdit}
                            color="primary"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default CompanyBenifitList;
