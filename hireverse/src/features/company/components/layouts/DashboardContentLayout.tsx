import ScrollableContainer from "@core/components/ui/ScrollableContainer";
import { Container} from "@mui/material";
import Header from "../Header";

type DashboardContentLayoutProps = {
    children: React.ReactNode;
};

const DashboardContentLayout = ({ children }: DashboardContentLayoutProps) => {
    return (
        <ScrollableContainer height={"100%"} overflow={"auto"} display={"flex"} flexDirection={"column"}>
            <Header />
            <Container component="section" sx={{ height: "100%", py: 3 }}>
                {children}
            </Container>
        </ScrollableContainer>
    );
};

export default DashboardContentLayout;
