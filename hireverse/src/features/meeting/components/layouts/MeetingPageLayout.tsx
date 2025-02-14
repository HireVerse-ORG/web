import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Box } from "@mui/material";

type MeetingPageLayoutProps = {
    children: React.ReactNode;
    header?: React.ReactNode;
}

const MeetingPageLayout = ({ children, header }: MeetingPageLayoutProps) => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* header */}
            {header}
            {/* content */}
            <ScrollableContainer
                sx={{
                    flexGrow: 1,
                    overflow: "auto",
                }}
            >
                {children}
            </ScrollableContainer>
        </Box>
    );
};

export default MeetingPageLayout;
