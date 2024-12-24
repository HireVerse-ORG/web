import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Container } from "@mui/material";
import Header from "../Header";

type ContentLayoutProps = {
    children: React.ReactNode;
}

const ContentLayout = ({ children }: ContentLayoutProps) => {
    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
                <Header/>
                <Container component="section" sx={{height: "100%", }}>
                    {children}
                </Container>
        </ScrollableContainer>
    );
};

export default ContentLayout
