import React from "react";
import {
    AppstoreAddOutlined,
    AppstoreOutlined,
    CalculatorOutlined,
    PartitionOutlined,
    PlusSquareOutlined,
    UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/constants";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
export const itemAdmin = [
    getItem(
        <Link to={"/"} className="text-white">
            Quản lí
        </Link>,
        "sub1",
        <AppstoreOutlined />,
        [
            getItem(
                <Link to={"/manage_employee"}>Quản lí nhân viên</Link>,
                "5"
            ),
            getItem(<Link to={"/release"}>Kết thúc</Link>, "6"),
        ]
    ),
    getItem("Lãnh đạo", "sub2", <AppstoreOutlined />, [
        getItem("Chờ duyệt", "9"),
        getItem("Đã duyệt", "10"),
    ]),
];
export const itemUser = [
    getItem(
        "Quản lí",

        "sub1",
        <AppstoreOutlined />,
        [
            getItem(
                <Link to={"/addnew_employee"}>Thêm mới nhân viên</Link>,
                "1",
                <PlusSquareOutlined />
            ),
            getItem(
                <Link to={"/manage_employee"}>Quản lí nhân viên</Link>,
                "2",
                <UsergroupDeleteOutlined />
            ),
            getItem(
                <Link to={"/release"}>Kết thúc</Link>,
                "3",
                <PartitionOutlined />
            ),
        ]
    ),
];
export const itemManage = [
    getItem("Quản lí", "sub4", <AppstoreOutlined />, [
        getItem(
            <Link to={"/manage_employee"}>Quản lí nhân viên</Link>,
            "13",
            <UsergroupDeleteOutlined />
        ),
        getItem(
            <Link to={"/release"}>Kết thúc</Link>,
            "14",
            <PartitionOutlined />
        ),
    ]),
    getItem("Lãnh đạo", "sub5", <AppstoreOutlined />, [
        getItem(
            <Link to={"/awaiting_approval"}>Chờ duyệt</Link>,
            "15",
            <AppstoreAddOutlined />
        ),
        getItem(
            <Link to={"/approved"}>Đã duyệt</Link>,
            "16",
            <CalculatorOutlined />
        ),
    ]),
];
const MenuComponent = ({ collapsed }) => {
    const { role } = useSelector((state) => state.account);
    let items = [];
    switch (role) {
        case ROLE.MANAGE:
            items = itemManage;
            break;
        case ROLE.USER:
            items = itemUser;
            break;
        default:
            items = itemAdmin;
    }
    return (
        <>
            <div className="w-full">
                <Menu
                    mode={"inline"}
                    theme="dark"
                    className="text-white h-screen"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </>
    );
};

export default MenuComponent;
