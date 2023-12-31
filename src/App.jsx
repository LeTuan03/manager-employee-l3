import React, { useEffect } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
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
import { STATUS } from "./constants/constants";
import { Button, Result } from "antd";
export default function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.account);
    const getRoleAccount = async () => {
        if (window.location.pathname === "/login") {
            return;
        }
        const res = await getAccount();
        if (res?.status === STATUS.SUCCESS) {
            dispatch(doLoginAction(res?.data[0]));
        }
    };
    useEffect(() => {
        getRoleAccount();
    }, []);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutHomePage></LayoutHomePage>,
            errorElement: (
                <Result
                    status="404"
                    title="404"
                    subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
                    extra={
                        <Button type="primary">
                            <Link to={"/"}>Trở lại trang chủ</Link>
                        </Button>
                    }
                />
            ),
            children: [
                {
                    index: true,
                    element: (
                        <img
                            className="h-[100%] w-[100%]"
                            src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*WzMpTIP8R6gAAAAAAAAAAABkARQnAQ"
                        />
                    ),
                },
                {
                    path: "/manage_employee",
                    element: isAuthenticated ? <Employee></Employee> : "403",
                },
                {
                    path: "/release",
                    element: isAuthenticated ? <PageEnd></PageEnd> : "403",
                },
                {
                    path: "/awaiting_approval",
                    element: isAuthenticated ? (
                        <AwaitingApproval></AwaitingApproval>
                    ) : (
                        "403"
                    ),
                },
                {
                    path: "/approved",
                    element: isAuthenticated ? <Approved></Approved> : "403",
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
