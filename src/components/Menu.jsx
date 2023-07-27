import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const itemAdmin = [
    getItem("Quản lí", "sub1", <MailOutlined />, [
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "5"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "6"),
    ]),
    getItem("Lãnh đạo", "sub2", <AppstoreOutlined />, [
        getItem(<Link to={"/awaiting_approval"}>Chờ duyệt</Link>, "8"),
        getItem(<Link to={"/release"}>Đã duyệt</Link>, "9"),
    ]),
];
const itemUser = [
    getItem("Quản lí", "sub3", <MailOutlined />, [
        getItem(<Link to={"/addnew_employee"}>Thêm mới nhân viên</Link>, "10"),
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "11"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "12"),
    ]),
];
const itemManage = [
    getItem("Quản lí", "sub4", <MailOutlined />, [
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "13"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "14"),
    ]),
    getItem("Lãnh đạo", "sub5", <MailOutlined />, [
        getItem(<Link to={"/awaiting_approval"}>Chờ duyệt</Link>, "15"),
        getItem(<Link to={"/release"}>Đã duyệt</Link>, "16"),
    ]),
];
const MenuComponent = ({ collapsed }) => {
    const { role } = useSelector((state) => state.account);
    return (
        <>
            <div className="w-full pt-12">
                <Menu
                    mode="inline"
                    className="bg-transparent text-white"
                    inlineCollapsed={collapsed}
                    items={
                        role === 3
                            ? itemAdmin
                            : role === 5
                            ? itemManage
                            : itemUser
                    }
                />
            </div>
        </>
    );
};

export default MenuComponent;
