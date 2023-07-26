import React, { useEffect } from "react";

import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import LayoutHomePage from "./pages/layouts/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import SignIn from "./pages/signin/Signin";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
import AddUserPage from "./pages/user/AddUserPage";
import RoleUserRoute from "./components/RoleUserRoute";
import PageEnd from "./pages/manage-end/PageEnd";
import Release from "./pages/release/Release";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlice";
import { getAccount } from "./services/api";

export default function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.account);

    const getRoleAccount = async () => {
        // if (window.location.pathname === "/login") {
        //     return;
        // }
        console.log(isAuthenticated);
        const res = await getAccount();
        if (res?.status === 200) {
            dispatch(doLoginAction(res?.data[0]));
        } else {
            navigate("/login");
        }
        console.log(isAuthenticated);
    };
    useEffect(() => {
        getRoleAccount();
    }, [dispatch]);

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
                    element: (
                        <>
                            <PageEnd></PageEnd>
                        </>
                    ),
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
            {isAuthenticated ? (
                <RouterProvider router={router} />
            ) : (
                <>Loading...</>
            )}
        </>
    );
}
