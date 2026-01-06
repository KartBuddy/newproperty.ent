import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./admin-dashboard/components/DashboardLayout";
import Overview from "./admin-dashboard/Overview";
import Properties from "./admin-dashboard/Properties";
import AddPropertyPage from "./admin-dashboard/AddPropertyPage";
import EditPropertyPage from "./admin-dashboard/EditPropertyPage";
import AdminPropertyDetails from "./admin-dashboard/AdminPropertyDetails";
import Settings from "./admin-dashboard/Settings";
import ContactMessages from "./admin-dashboard/ContactMessages";
import ContactDetailView from "./admin-dashboard/ContactDetailView";
import PropertyInquiries from "./admin-dashboard/PropertyInquiries";
import InquiryDetailView from "./admin-dashboard/InquiryDetailView";
import Login from "./admin-dashboard/Login";
import PropertyBrokerWebsite from "./components/PropertyBrokerWebsite";
import PropertyDetails from "./components/PropertyDetails";
import RequestPropertyPage from "./components/RequestPropertyPage";

import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<PropertyBrokerWebsite />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/request-property" element={<RequestPropertyPage />} />

      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/add" element={<AddPropertyPage />} />
        <Route path="properties/:id" element={<AdminPropertyDetails />} />
        <Route path="properties/edit/:id" element={<EditPropertyPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="inquiries" element={<PropertyInquiries />} />
        <Route path="inquiries/:id" element={<InquiryDetailView />} />
        <Route path="messages" element={<ContactMessages />} />
        <Route path="messages/:id" element={<ContactDetailView />} />
      </Route>

      <Route path="/dashboard" element={<Navigate to="/admin/overview" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;