import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import DashboardContentLayout from "./components/layouts/DashboardContentLayout";
import { CompanySidebarSections } from "./components/SidebarSections";
import { CompanyProvider } from "@core/contexts/CompanyContext";
import ProtectedRoute from "./components/ProtectedRoutes";
import { CompanySubscriptionProvider } from "@core/contexts/CompanySubscriptionContext";
import PageLoader from "@core/components/ui/PageLoader";

const CompanyDashboardPage = lazy(() => import("./pages/CompanyDashboardPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const CompanyProfilePage = lazy(() => import("./pages/CompanyProfilePage"));
const PostJobPage = lazy(() => import("./pages/PostJobPage"));
const MyJobsPage = lazy(() => import("./pages/MyJobsPage"));
const PricingPlansPage = lazy(() => import("./pages/PricingPlansPage"));
const EditJobPage = lazy(() => import("./pages/EditJobPage"));
const CompanyJobViewPage = lazy(() => import("./pages/CompanyJobViewPage"));
const ApplicantDetailsPage = lazy(() => import("./pages/ApplicantDetailsPage"));
const ApplicationsListPage = lazy(() => import("./pages/ApplicationsListPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const MessagesPage = lazy(() => import("../shared/MessagesPage"));
const MySchedulesPage = lazy(() => import("../shared/MySchedulesPage"));
const ProfileCreationPage = lazy(() => import("./pages/ProfileCreationPage"));

const CompanyRoutes = () => {
  return (
    <CompanyProvider>
      <CompanySubscriptionProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              element={
                <DashboardLayout
                  ContentLayout={DashboardContentLayout}
                  Sidebar={<Sidebar sections={CompanySidebarSections} />}
                />
              }
            >
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<CompanyDashboardPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/profile" element={<CompanyProfilePage />} />
                <Route path="/post-job" element={<PostJobPage />} />
                <Route path="/edit-job" element={<EditJobPage />} />
                <Route path="/jobs" element={<MyJobsPage />} />
                <Route path="/job/:id" element={<CompanyJobViewPage />} />
                <Route path="/applicants" element={<ApplicationsListPage />} />
                <Route path="/applicant/:id" element={<ApplicantDetailsPage />} />
                <Route path="/schedules" element={<MySchedulesPage />} />
                <Route path="/pricing-plans" element={<PricingPlansPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
            <Route path="/profile-creation" element={<ProfileCreationPage />} />
            <Route path="*" element={<Navigate to="/company" />} />
          </Routes>
        </Suspense>
      </CompanySubscriptionProvider>
    </CompanyProvider>
  );
};

export default CompanyRoutes;
