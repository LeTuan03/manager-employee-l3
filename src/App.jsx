import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlice";
import { getAccount } from "./services/api";

import LayoutHomePage from "./pages/layouts/LayoutHomePage";
import Employee from "./pages/manager/Employee";
import SignIn from "./pages/signin/Signin";
import AwaitingApproval from "./pages/awaiting-approval/AwaitingApproval";
import Approved from "./pages/approved/Approved";
import AddUserPage from "./pages/user/AddUserPage";
import RoleUserRoute from "./components/RoleUserRoute";
import PageEnd from "./pages/manage-end/PageEnd";

export default function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.account);

    const getRoleAccount = async () => {
        const res = await getAccount();
        if (res?.status === 200) {
            dispatch(doLoginAction(res?.data[0]));
        }
    };

    useEffect(() => {
        getRoleAccount();
        if (!isAuthenticated) {
            const navigate = useNavigate();
            navigate("/login");
        }
    }, [dispatch, isAuthenticated]);

    return isAuthenticated || window.location.pathname === "/login" ? (
        <Router>
            <Routes>
                <Route path="/" element={<LayoutHomePage />}>
                    <Route index element={<></>} />
                    <Route path="manage_employee" element={<Employee />} />
                    <Route path="release" element={<PageEnd />} />
                    <Route
                        path="awaiting_approval"
                        element={<AwaitingApproval />}
                    />
                    <Route path="approved" element={<Approved />} />
                    <Route
                        path="addnew_employee"
                        element={
                            <RoleUserRoute>
                                <AddUserPage />
                            </RoleUserRoute>
                        }
                    />
                </Route>
                <Route path="admin" element={<></>}>
                    <Route index element={<></>} />
                    <Route path="user" element={<></>} />
                </Route>
                <Route path="login" element={<SignIn />} />
            </Routes>
        </Router>
    ) : (
        <>Loading...</>
    );
}
