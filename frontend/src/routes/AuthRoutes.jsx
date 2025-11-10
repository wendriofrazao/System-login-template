import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { VerifyEmail } from "../pages/EmailVerify.jsx";
import { ResetPassword } from "../pages/ResetPassword.jsx";

export const AuthRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/email-verify" element={<VerifyEmail/>} />
            <Route path="/email-reset" element={<ResetPassword/>} />
        </Routes>

    )

}