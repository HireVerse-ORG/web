import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";

const MeetingRoutes = () => {
    return (
        <Routes>
            <Route path=":roomId" element={<RoomPage />} />
        </Routes>
    );
}

export default MeetingRoutes;
