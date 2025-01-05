import ProfilePage from "../seeker/pages/ProfilePage";
import { Container } from "@mui/material";
import Header from "./components/Header";
import { Navigate, useParams } from "react-router-dom";

const SeekerPublicProfilePage = () => {
    const { name } = useParams();

    if(!name){
        return <Navigate to={"/not-found"} />
    }

    return (
        <>  
            <Header/>
            <Container>
                <ProfilePage mode="read"/>
            </Container>
        </>
    );
}

export default SeekerPublicProfilePage;
