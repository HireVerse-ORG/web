import Logo from "@core/components/ui/Logo";
import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Box } from "@mui/material";

type MeetingPageLayoutProps = {
    children: React.ReactNode;
}

const MeetingPageLayout = ({ children }: MeetingPageLayoutProps) => {
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box sx={{
                paddingBlock: 3,
                paddingInline: 2,
            }}>
                <Logo />
            </Box>
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
