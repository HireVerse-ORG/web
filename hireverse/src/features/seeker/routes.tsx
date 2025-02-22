import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import ContentLayout from "./components/layouts/ContentLayout";
import { SeekerSidebarSections } from "./components/SidebarSection";
import { SubscriptionProvider } from "@core/contexts/SeekerSubscriptionContext";
import PageLoader from "@core/components/ui/PageLoader";

const SeekerDashboardPage = lazy(() => import("./pages/SeekerDashboardPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const FindJobsPage = lazy(() => import("../shared/FindJobsPage"));
const ViewJobPage = lazy(() => import("../shared/ViewJobPage"));
const MyApplicationsPage = lazy(() => import("./pages/MyApplicationsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const MyApplicationViewPage = lazy(() => import("./pages/MyApplicationViewPage"));
const BrowseCompaniesPage = lazy(() => import("./pages/BrowseCompaniesPage"));
const MessagesPage = lazy(() => import("../shared/MessagesPage"));
const MySchedulesPage = lazy(() => import("../shared/MySchedulesPage"));

const SeekerRoutes = () => {
  return (
    <SubscriptionProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            element={
              <DashboardLayout
                Sidebar={<Sidebar sections={SeekerSidebarSections} />}
                ContentLayout={ContentLayout}
              />
            }
          >
            <Route path="/" element={<SeekerDashboardPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage mode="edit" />} />
            <Route path="/schedules" element={<MySchedulesPage />} />
            <Route path="/find-jobs" element={<FindJobsPage viewJobBaseUrl="/seeker/view-job" />} />
            <Route path="/browse-companies" element={<BrowseCompaniesPage />} />
            <Route path="/view-job/:id" element={<ViewJobPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
            <Route path="/my-application/:id" element={<MyApplicationViewPage />} />
            <Route path="/pricing-plans" element={<PricingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to={"/seeker"} />} />
          </Route>
        </Routes>
      </Suspense>
    </SubscriptionProvider>
  );
};

export default SeekerRoutes;
