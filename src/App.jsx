import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./admin-dashboard/components/DashboardLayout";
import Overview from "./admin-dashboard/Overview";
import Properties from "./admin-dashboard/Properties";
import AddPropertyPage from "./admin-dashboard/AddPropertyPage";
import EditPropertyPage from "./admin-dashboard/EditPropertyPage";
import Login from "./admin-dashboard/Login";
import PropertyBrokerWebsite from "./components/PropertyBrokerWebsite";
import PropertyDetails from "./components/PropertyDetails";


function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<PropertyBrokerWebsite />} />
      <Route path="/property/:id" element={<PropertyDetails />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Dashboard Routes */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/admin/overview" replace />} />
        <Route path="overview" element={<Overview />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/add" element={<AddPropertyPage />} />
        <Route path="properties/edit/:id" element={<EditPropertyPage />} />
        <Route path="inbox" element={<div className="p-8"><h1 className="text-2xl font-bold">Inbox (Coming Soon)</h1></div>} />
        <Route path="activity" element={<div className="p-8"><h1 className="text-2xl font-bold">Activity (Coming Soon)</h1></div>} />
        <Route path="calendar" element={<div className="p-8"><h1 className="text-2xl font-bold">Calendar (Coming Soon)</h1></div>} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings (Coming Soon)</h1></div>} />
        <Route path="help" element={<div className="p-8"><h1 className="text-2xl font-bold">Help (Coming Soon)</h1></div>} />
      </Route>

      {/* Catch-all Redirect */}
      <Route path="/dashboard" element={<Navigate to="/admin/overview" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
