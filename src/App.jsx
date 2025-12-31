import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./admin-dashboard/components/DashboardLayout";
import Overview from "./admin-dashboard/Overview";
import Properties from "./admin-dashboard/Properties";
import AddPropertyPage from "./admin-dashboard/AddPropertyPage";
import EditPropertyPage from "./admin-dashboard/EditPropertyPage";
import Settings from "./admin-dashboard/Settings";
import ContactMessages from "./admin-dashboard/ContactMessages";
import ContactDetailView from "./admin-dashboard/ContactDetailView";
import Login from "./admin-dashboard/Login";
import PropertyBrokerWebsite from "./components/PropertyBrokerWebsite";
import PropertyDetails from "./components/PropertyDetails";


import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<PropertyBrokerWebsite />} />
      <Route path="/property/:id" element={<PropertyDetails />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard Routes (Protected) */}
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
        <Route path="properties/edit/:id" element={<EditPropertyPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="messages" element={<ContactMessages />} />
        <Route path="messages/:id" element={<ContactDetailView />} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="/dashboard" element={<Navigate to="/admin/overview" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
