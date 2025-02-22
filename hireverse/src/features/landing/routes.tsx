import PageLoader from "@core/components/ui/PageLoader";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Lazy load your page components
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SeekerPublicProfilePage = lazy(() => import("./pages/SeekerPublicProfilePage"));
const Layout = lazy(() => import("./components/Layout"));
const CompanyPublicViewPage = lazy(() => import("./pages/CompanyPublicViewPage"));
const FindJobsPage = lazy(() => import("../shared/FindJobsPage"));
const ViewJobPage = lazy(() => import("../shared/ViewJobPage"));
const DiscoverCompaniesPage = lazy(() => import("./pages/DiscoverCompaniesPage"));

const LandingRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/find-jobs" element={<FindJobsPage viewJobBaseUrl="/view-job" />} />
          <Route path="/discover-companies" element={<DiscoverCompaniesPage />} />
          <Route path="/view-job/:id" element={<ViewJobPage />} />
        </Route>
        <Route path=":name" element={<SeekerPublicProfilePage />} />
        <Route path="/company-view/:companyId" element={<CompanyPublicViewPage />} />
        <Route path="*" element={<Navigate to={"/not-found"} />} />
      </Routes>
    </Suspense>
  );
}

export default LandingRoutes;
