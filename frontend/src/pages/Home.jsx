import React from "react";
import { WelcomeApp } from "../components/Welcome";
import { Navbar } from "../components/NavBar";

export const Home = () => {
    return (
        <>
            <Navbar/>
            <WelcomeApp/>
        </>
    )
}