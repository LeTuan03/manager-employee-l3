import React, { useEffect } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutHomePage from "./pages/layouts/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import SignIn from "./pages/signin/Signin";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
import AddUserPage from "./pages/user/AddUserPage";
import RoleUserRoute from "./components/RoleUserRoute";
import PageEnd from "./pages/manage-end/PageEnd";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlice";
import { getAccount } from "./services/api";

export default function App() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.account);

    const getRoleAccount = async () => {
        if (window.location.pathname === "/login") {
            return;
        }
        try {
            const res = await getAccount(); // Replace this with your actual API call
            if (res?.status === 200) {
                dispatch(doLoginAction(res?.data[0]));
            }
        } catch (error) {
            console.error("Error fetching account data:", error);
        }
    };

    useEffect(() => {
        getRoleAccount();
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            key: "/",
            element: <LayoutHomePage></LayoutHomePage>,
            errorElement: <>Not Found</>,
            children: [
                {
                    index: true,
                    key: "1",
                    element: <></>,
                },
                {
                    path: "/manage_employee",
                    key: "2",
                    element: <Employee></Employee>,
                },
                {
                    path: "/release",
                    key: "3",
                    element: <PageEnd></PageEnd>,
                },
                {
                    path: "/awaiting_approval",
                    key: "4",
                    element: <AwaitingApproval></AwaitingApproval>,
                },
                {
                    path: "/approved",
                    key: "5",
                    element: <Approved></Approved>,
                },
                {
                    path: "/addnew_employee",
                    key: "6",
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
            key: "8",
            errorElement: <></>,
            children: [
                {
                    index: true,
                    key: "9",
                    element: <></>,
                },
                {
                    path: "user",
                    key: "10",
                    element: <>Manage User</>,
                },
            ],
        },
        {
            path: "/login",
            key: "11",
            element: <SignIn />,
        },
    ]);
    return (
        <>
            {/* {isAuthenticated || window.location.pathname === "/login" ? ( */}
            <RouterProvider router={router} />
            {/* ) : (
                <>
                    <Button>Go To SIGNIN</Button>
                </>
            )} */}
        </>
    );
}
