import React from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { BarsOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/constants";
import { itemAdmin, itemManage, itemUser } from "./Menu";

const Header = () => {
    const { role } = useSelector((state) => state.account);
    const navigate = useNavigate();
    let items = [];
    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    const renderGreetingText = () => {
        switch (role) {
            case ROLE.MANAGE:
                items = itemManage;
                return "Chào, MANAGER";
            case ROLE.USER:
                items = itemUser;
                return "Chào, USER";
            case ROLE.ADMIN:
                items = itemAdmin;
                return "Chào, ADMIN";
            default:
                return "Lỗi , Quay lại đăng nhập";
        }
    };

    const handleLogoutClick = () => {
        handleLogOut();
    };

    const menuItems = [
        {
            key: "1",
            label: (
                <div className="text-xl w-[300px]" onClick={handleLogoutClick}>
                    <LogoutOutlined className="pr-2" />
                    {role === ROLE.MANAGE ||
                    role === ROLE.USER ||
                    role === ROLE.ADMIN
                        ? "Đăng Xuất"
                        : " Đăng Nhập"}{" "}
                </div>
            ),
        },
    ];

    return (
        <div className="border-b shadow-lg fixed top-0 py-3 w-[85%] z-[1] bg-white max-lg:w-full max-md:w-full max-md:mr-10 max-lg:mr-3 font-mono">
            <div className="flex justify-between items-center mr-4">
                <div></div>
                <div>
                    <strong
                        className="leading-3"
                        style={{
                            fontFamily: "Phudu, cursive",
                            letterSpacing: 2,
                        }}
                    >
                        {renderGreetingText()}
                    </strong>
                    <Dropdown
                        overlay={<Menu items={menuItems} />}
                        placement="bottom"
                        className="w-[300px] ml-5"
                    >
                        <Avatar size={40} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </div>
            <div className="lg:hidden fixed max-w-[100%] top-[9px] left-3 overflow-hidden rounded-2xl">
                <Menu
                    className="bg-[#1677ff]"
                    defaultSelectedKeys={["1"]}
                    mode="horizontal"
                    items={items}
                />
                <BarsOutlined className="fixed top-[20px] left-[23px] text-white text-2xl icon pointer-events-none" />
            </div>
        </div>
    );
};

export default Header;
