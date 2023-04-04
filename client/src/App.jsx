import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleTrip from "./pages/SingleTrip/SingleTrip";
import AboutPage from "../src/pages/AboutPage/AboutPage.jsx";
import ResultPage from "./pages/ResultPage/ResultPage";
import Navbar from "./components/NavBar/NavBar";
import FooterBar from "./components/FooterBar/FooterBar";
import LoginPage from "./pages/LoginPage/LoginPage";
import Register from "./pages/Register/Register";
import CreateReview from "../src/pages/CreateReview/CreateReview.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import DiscoverTrips from "./pages/DiscoverTrips/DiscoverTrips";
import SingleCity from "./components/SingleCity/SingleCity";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 1500,
  position: positions.BOTTOM_CENTER,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <main className="all-pages">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/detail/:id" element={<SingleTrip />} />
          <Route path="/details/:city" element={<SingleCity />} />
          <Route path="/discover" element={<DiscoverTrips />} />
          <Route path="/resultPage" element={<ResultPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createReview" element={<CreateReview />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgotPassword/:id/link" element={<ForgotPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <FooterBar />
      </main>
    </Provider>
  );
};

export default App;
