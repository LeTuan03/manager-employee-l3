import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHomePage from "./components/layout/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import { getAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlice";
import RoleUserRoute from "./components/RoleUserRoute";
import AddUserPage from "./pages/user/AddUserPage";
import Signin from "./pages/signin/Signin";
import PageEnd from "./pages/manage-end/PageEnd";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
export default function App() {
    // const dispatch = useDispatch();
    // const { isAuthenticated } = useSelector((state) => state.account);
    // const getRoleAccount = async () => {
    //     if (window.location.pathname === "/login") {
    //       return
    //     }
    //     const res = await getAccount()
    //     if (res?.status === STATUS.SUCCESS) {
    //       dispatch(doLoginAction(res?.data[0]));
    //     }
    // }
    // useEffect(() => {
    //   getRoleAccount()
    // }, [])
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
            {/* isAuthenticated ||
          window.location.pathname === "/login" ? <RouterProvider router={router} /> : <>Loading...</> */}
            <RouterProvider router={router} />
        </>
    );
}
