import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Box } from "@mui/material";
import Header from "../Header";

type ContentLayoutProps = {
    children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
                <Header/>
                <Box component="section" sx={{height: "100%", px: 3}}>
                    {children}
                </Box>
        </ScrollableContainer>
    );
};

export default ContentLayout
