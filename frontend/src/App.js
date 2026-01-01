import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ViewHospitals from "./pages/ViewHospitals";
import AddHospital from "./pages/AddHospital";
import EditHospital from "./pages/EditHospital";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */
        /* <Route path="/admin/hospitals" element={<ViewHospitals />} />
        <Route path="/admin/add-hospital" element={<AddHospital />} />
        <Route path="/admin/edit-hospital/:id" element={<EditHospital />} /> */}


        <Route
          path="/admin/hospitals"
          element={
            <AdminRoute>
              <ViewHospitals />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-hospital"
          element={
            <AdminRoute>
              <AddHospital />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-hospital/:id"
          element={
            <AdminRoute>
              <EditHospital />
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
