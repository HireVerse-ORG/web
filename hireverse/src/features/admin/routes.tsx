import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@core/components/layouts/DashboardLayout";
import Sidebar from "@core/components/ui/Sidebar";
import ContentLayout from "./components/layouts/ContentLayout";
import { AdminSideBarSections } from "./components/SideBarSections";
import PageLoader from "@core/components/ui/PageLoader";

const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const SeekersPage = lazy(() => import("./pages/SeekersPage"));
const CompaniesPage = lazy(() => import("./pages/CompaniesPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const JobCategoryPage = lazy(() => import("./pages/JobCategoryPage"));
const TransactionPage = lazy(() => import("./pages/TransactionPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const AdminRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          element={
            <DashboardLayout
              ContentLayout={ContentLayout}
              Sidebar={<Sidebar sections={AdminSideBarSections} />}
            />
          }
        >
          <Route path="/" element={<AdminDashboardPage />} />
          <Route path="/seekers" element={<SeekersPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/job-category" element={<JobCategoryPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to={"/admin"} />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;
