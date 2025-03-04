import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Spinner from "./components/user/Spinner";
import OwnerDashboard from "./components/owner/OwnerDashboard"; 
import ViewUser from "./components/owner/ViewUser";
import ViewOffers from "./components/owner/ViewOffer";
import AddOffer from "./components/owner/AddOffer";
import EditOffer from "./components/owner/EditOffer";
import ViewClaim from "./components/owner/ViewClaim";
import VerifyOtp from "./components/user/VerifyOtp";
import AdminDashboard from "./components/admin/AdminDashboard";
import OwnerRegistration from "./components/owner/OwnerRegistration";
import OwnerLogin from "./components/owner/OwnerLogin";
import ForgotPassword from "./components/owner/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/:ownerId" element={<Login />} />
        <Route path="/signup/:ownerId" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/spinner/:ownerId" element={<Spinner />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/view-users" element={ <ViewUser/>}/>
        <Route path="/view-offers" element={ <ViewOffers />} />
        <Route path="/add-offer" element={<AddOffer />} />
        <Route path="/edit-offer/:id" element={<EditOffer />} />
        <Route path="/owner/view-redeemed/:userId" element={<ViewClaim />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        <Route path = "/owner-registration" element={<OwnerRegistration/>}/>
        <Route path="/owner-login" element={<OwnerLogin/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
      </Routes>
    </Router>
  );
}

export default App;
