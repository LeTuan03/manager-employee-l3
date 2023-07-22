import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHomePage from "./pages/layouts/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import SignIn from "./pages/signin/Signin";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
import Release from "./pages/release/Release";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutHomePage></LayoutHomePage>,
            errorElement: <>Not Found</>,
            children: [
                {
                    index: true,
                    element: <></>,
                },
                {
                    path: "/manage_employee",
                    element: <Employee></Employee>,
                },
                {
                    path: "/release",
                    element: <Release></Release>,
                },
                {
                    path: "/awaiting_approval",
                    element: <AwaitingApproval></AwaitingApproval>,
                },
                {
                    path: "/approved",
                    element: <Approved></Approved>,
                },
            ],
        },
        {
            path: "/admin",
            element: <></>,
            errorElement: <></>,
            children: [
                {
                    index: true,
                    element: <></>,
                },
                {
                    path: "user",
                    element: <>Manage User</>,
                },
            ],
        },
        {
            path: "/login",
            element: <SignIn />,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
