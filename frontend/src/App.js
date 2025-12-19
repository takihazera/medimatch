import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import ViewHospitals from "./pages/ViewHospitals";
import AddHospital from "./pages/AddHospital";
import EditHospital from "./pages/EditHospital";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/hospitals" element={<ViewHospitals />} />
        <Route path="/admin/add-hospital" element={<AddHospital />} />
        <Route path="/admin/edit-hospital/:id" element={<EditHospital />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
