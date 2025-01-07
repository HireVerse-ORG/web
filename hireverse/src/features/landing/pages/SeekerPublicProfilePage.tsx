import ProfilePage from "../../seeker/pages/ProfilePage";
import { Container } from "@mui/material";
import Header from "../components/Header";
import {useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSeekerProfile } from "@core/api/seeker/profileApi";
import PageLoader from "@core/components/ui/PageLoader";

const SeekerPublicProfilePage = () => {
    const[loading, setLoading] = useState(true)
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(name){
            getSeekerProfile(name)
            .then((data) => {
                if(!data){
                    navigate("/not-found");
                }else {
                    setLoading(false)
                }
            })
            .catch(() => navigate("/not-found"))
        } else {
            navigate("/not-found");
        }
    }, [name])

    if(loading){
        return <PageLoader/>
    }

    return (
        <>  
            <Header/>
            <Container>
                <ProfilePage mode="read" username={name}/>
            </Container>
        </>
    );
}

export default SeekerPublicProfilePage;
