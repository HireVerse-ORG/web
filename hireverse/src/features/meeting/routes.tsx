import PageLoader from "@core/components/ui/PageLoader";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const RoomPage = lazy(() => import("./pages/RoomPage"));

const MeetingRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path=":roomId" element={<RoomPage />} />
      </Routes>
    </Suspense>
  );
};

export default MeetingRoutes;
