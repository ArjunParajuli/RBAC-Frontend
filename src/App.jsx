import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import UserLayout from "./Layouts/UserLayout";
import PublicLayouts from "./Layouts/PublicLayouts";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/landing" element={<PublicLayouts />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}
