import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./users/pages/Home";
import Preloader from "./components/Preloader";
import { useState, useEffect } from "react";
import Auth from "./pages/Auth";
import Contact from './users/pages/Contact'
import Profile from "./users/pages/Profile";
import AdminHome from "./admin/pages/AdminHome";
import TermsAndPrivacy from "./users/pages/TermsAndPrivacy";
import AdminRequests from "./admin/pages/AdminRequests";
import AdminUsers from './admin/pages/AdminUsers';
import UserRequests from "./users/components/UserRequests";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loading ? <Home /> : <Preloader />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/terms-privacy" element={<TermsAndPrivacy />} />
        <Route path="/my-requests" element={<UserRequests />} />

        <Route path="/admin-home" element={<AdminHome/>} />
        <Route path="/admin-request" element={<AdminRequests />} />
        <Route path="/admin-users" element={<AdminUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
