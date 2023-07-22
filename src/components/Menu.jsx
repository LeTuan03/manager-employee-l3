import React from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem("Quản lí", "sub1", <MailOutlined />, [
        getItem(<Link to={"/manage_employee"}>Quản lí nhân viên</Link>, "5"),
        getItem(<Link to={"/release"}>Kết thúc</Link>, "6"),
    ]),
    getItem("Lãnh đạo", "sub2", <AppstoreOutlined />, [
        getItem(<Link to={"/awaiting_approval"}>Chờ duyệt</Link>, "9"),
        getItem(<Link to={"/approved"}>Đã duyệt</Link>, "10"),
    ]),
];
const MenuComponent = () => {
    return (
        <>
            <div className="w-full pt-12">
                <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    className="bg-transparent text-white"
                    // inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </>
    );
};

export default MenuComponent;
