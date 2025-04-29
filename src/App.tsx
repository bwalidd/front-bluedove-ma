import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ForgetPassowrd from "./pages/ForgetPassword";
import CheckoutPage from "./pages/CheckoutPage";
import { CheckoutProvider } from "./components/CheckoutContext"; // Import just the provider
import DashboardPage from "./pages/Dashboard";
import CamerasPage from "./pages/camerasPage";
import BillingDashboard from "./pages/BillingDashboard";
import Settings from "./pages/Settings";
import HelpSupportPage from "./pages/Support";

const App: React.FC = () => {
  return (
    <CheckoutProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPassowrd />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/cameras" element={<CamerasPage />} />
          <Route path="/billings" element={<BillingDashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<HelpSupportPage />} />

        </Routes>
      </Router>
    </CheckoutProvider>
  );
}

export default App;