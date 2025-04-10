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
import GenerateLink from "./components/owner/GnerateLink";
import ViewShopOwner from "./components/admin/ViewShopOwner";
import ViewShopUser from "./components/admin/ViewShopUser";
import UserOffer from "./components/user/UserOffer";
import AllShops from "./components/user/AllShop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/:shopName/:ownerId" element={<Login />} />
        <Route path="/signup/:shopName/:ownerId" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/spinner/:shopName/:ownerId" element={<Spinner />} />
        <Route path="/user-offers/:shopName/:ownerId" element={<UserOffer />} />
        <Route path="/All-shops" element={<AllShops />} />
        
        <Route path="/shop-owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/shop-owner/view-users" element={ <ViewUser/>}/>
        <Route path="/shop-owner/view-offers" element={ <ViewOffers />} />
        <Route path="/shop-owner/add-offer" element={<AddOffer />} />
        <Route path="/edit-offer/:offerId" element={<EditOffer />} />
        <Route path="/owner/view-redeemed/:userId" element={<ViewClaim />} />
        <Route path = "/shop-owner-registration" element={<OwnerRegistration/>}/>
        <Route path="/shop-owner-login" element={<OwnerLogin/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/generate-link" element={<GenerateLink />} />

        <Route path="/Offerwhisky-admin-dashboard" element={<AdminDashboard/>}/>
        <Route path="/Offeerwhisky-admin/viewshopowner" element={<ViewShopOwner />} />
        <Route path="/Offeerwhisky-admin/viewshopowner/viewusers/:ownerId" element={<ViewShopUser />} />

      </Routes>
    </Router>
  );
}

export default App;
