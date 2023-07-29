import React, { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router-dom";

const LayoutHomePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <>
            <div className="ml-[15%]">
                <Header
                    toggleCollapsed={toggleCollapsed}
                    collapsed={collapsed}
                ></Header>
                <div className="px-4 pt-5">
                    <Outlet />
                </div>
            </div>
            <Sidebar collapsed={collapsed}></Sidebar>
        </>
    );
};

export default LayoutHomePage;
