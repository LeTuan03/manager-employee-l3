import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const LayoutHomePage = () => {
    return (
        <>
            <div className="ml-[15%] max-md:ml-0 max-lg:ml-0">
                <Header></Header>
                <div className="px-4 pt-5 mt-20">
                    <Outlet />
                </div>
            </div>
            <Sidebar></Sidebar>
        </>
    );
};

export default LayoutHomePage;
