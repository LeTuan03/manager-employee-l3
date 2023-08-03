import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHomePage from "./components/layout/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import RoleUserRoute from "./components/RoleUserRoute";
import AddUserPage from "./pages/user/AddUserPage";
import Signin from "./pages/signin/Signin";
import PageEnd from "./pages/manage-end/PageEnd";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
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
                    element: <PageEnd></PageEnd>,
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
                        <RoleUserRoute role={4}>
                            <AddUserPage></AddUserPage>
                        </RoleUserRoute>
                    ),
                },
            ],
        },
        {
            path: "/login",
            element: <Signin></Signin>,
        },
    ]);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
