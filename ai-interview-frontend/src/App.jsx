import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";


// =====================================================
// ROUTE GUARDS
// =====================================================

import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute";


// =====================================================
// PUBLIC PAGES
// =====================================================

import Login from "./pages/Login";
import Register from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassward";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";


// =====================================================
// MAIN PAGES
// =====================================================

import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Coding from "./pages/Coding";
import Performance from "./pages/Performance";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


// =====================================================
// INTERVIEW HISTORY
// =====================================================

import InterviewHistory from "./pages/InterviewHistory";
import InterviewDetails from "./pages/InterviewDetails";


// =====================================================
// HOME COMPONENTS
// =====================================================

import Navbar from "./componants/Navbar";
import Hero from "./componants/Hero";
import Features from "./componants/Features";
import HowItWorks from "./componants/HowItWorks";
import CTA from "./componants/CTA";
import Footer from "./componants/Footer";


// =====================================================
// SCROLL TO HASH
// =====================================================

function ScrollToHash() {

  const location = useLocation();


  useEffect(() => {

    if (location.hash) {

      const id = location.hash.substring(1);

      const element = document.getElementById(id);


      if (element) {

        setTimeout(() => {

          element.scrollIntoView({
            behavior: "smooth",
          });

        }, 100);

      }

    } else {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    }

  }, [location]);


  return null;
}


// =====================================================
// HOME PAGE
// =====================================================

function Home() {

  return (

    <>
      <Navbar />

      <main>

        <Hero />

        <Features />

        <HowItWorks />

        <CTA />

      </main>

      <Footer />

    </>

  );

}


// =====================================================
// APP
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <ScrollToHash />

      <Routes>


        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route element={<PublicRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>


        {/* =================================================
            PASSWORD ROUTES
        ================================================= */}

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =================================================
            PROTECTED ROUTES
        ================================================= */}

        <Route element={<ProtectedRoute />}>


          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* RESUME */}

          <Route
            path="/resume"
            element={<Resume />}
          />


          {/* MOCK INTERVIEW */}

          <Route
            path="/interview"
            element={<Interview />}
          />


          {/* =================================================
              INTERVIEW HISTORY
          ================================================= */}

          <Route
            path="/interview-history"
            element={<InterviewHistory />}
          />


          {/* =================================================
              INTERVIEW DETAILS
              
              IMPORTANT:
              Keep this AFTER /interview-history
          ================================================= */}

          <Route
            path="/interview-history/:id"
            element={<InterviewDetails />}
          />


          {/* CODING */}

          <Route
            path="/coding"
            element={<Coding />}
          />


          {/* PERFORMANCE */}

          <Route
            path="/performance"
            element={<Performance />}
          />


          {/* PROFILE */}

          <Route
            path="/profile"
            element={<Profile />}
          />


          {/* SETTINGS */}

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Route>


        {/* =================================================
            FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>

  );

}


export default App;