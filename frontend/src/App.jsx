import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import AdminComplaints from "./pages/AdminComplaints";
import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";



function App() {

  return (
    <BrowserRouter>
     <Navbar />

      <Routes>

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/create-complaint"
  element={
    <ProtectedRoute>
      <CreateComplaint />
    </ProtectedRoute>
  }
/>
<Route
  path="/my-complaints"
  element={<MyComplaints />}
/>
<Route
  path="/complaint/:id"
  element={<ComplaintDetails />}
/>
<Route
  path="/admin"
  element={<AdminComplaints />}
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminComplaints />
    </AdminRoute>
  }
/>

      
      </Routes>

    </BrowserRouter>
  );
}


export default App;