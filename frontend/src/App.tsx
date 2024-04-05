import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import HomePage from "./HomePage";
import SignUp from "./Components/SignUp";
import ListCourses from "./Components/ListCourses";
import Course from "./Components/Course";
import Pricing from "./Components/Pricing";
import Profile from "./Components/Profile";
import AboutUS from "./Components/AboutUs";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import NewCourse from "./Components/NewCourse";
import UserProfile from "./Components/UserProfile";
import Terms from "./Components/TermsConditions";
import ContactUs from "./Components/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/Home" element={<HomePage />}></Route>
        <Route path="/Home/:name" element={<ListCourses />}></Route>
        <Route path="/Home/:name/:id" element={<Course />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/aboutus" element={<AboutUS />}></Route>
        <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
        <Route path="/Home/new" element={<NewCourse />}></Route>
        <Route path="/Home/user" element={<UserProfile />}></Route>
        <Route path="/t&c" element={<Terms />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
