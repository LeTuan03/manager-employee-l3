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
        getItem("Chờ duyệt", "9"),
        getItem("Đã duyệt", "10"),
    ]),
];
const itemUser = [
    getItem("Quản lí", "sub1", <MailOutlined />, [
        getItem(<Link to={"/addnew_employee"}>Thêm mới nhân viên</Link>, "1"),
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "2"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "3"),
    ]),
];
const itemManage = [
    getItem("Quản lí", "sub1", <MailOutlined />, [
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "5"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "6"),
    ]),
    getItem("Lãnh đạo", "sub1", <MailOutlined />, [
        getItem(<Link to={"/awaiting_approval"}>Chờ duyệt</Link>, "8"),
        getItem(<Link to={"/release"}>Đã duyệt</Link>, "9"),
    ]),
];
const MenuComponent = ({ collapsed }) => {
    const { role } = useSelector((state) => state.account);
    return (
        <>
            <div className="w-full pt-12">
                <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
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
