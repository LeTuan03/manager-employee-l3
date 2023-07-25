import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHomePage from "./pages/layouts/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import SignIn from "./pages/signin/Signin";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
import Release from "./pages/release/Release";
import UpdateHappeningManage from "./pages/update_happening/UpdateHappeningManage";
import AddUserPage from "./pages/user/AddUserPage";
import RoleUserRoute from "./components/RoleUserRoute";

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
                    path: "/update_appening",
                    element: <UpdateHappeningManage></UpdateHappeningManage>,
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
                {
                    path: "/addnew_employee",
                    element: (
                        <RoleUserRoute>
                            <AddUserPage></AddUserPage>
                        </RoleUserRoute>
                    ),
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
