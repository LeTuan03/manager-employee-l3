import React, { useState } from "react";
import { Button, Dropdown, Avatar } from "antd";
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = ({ toggleCollapsed, collapsed }) => {
    const { role } = useSelector((state) => state.account);
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };
    const items = [
        {
            key: "1",
            label: (
                <div
                    className="text-xl w-[300px]"
                    onClick={() => handleLogOut()}
                >
                    <LogoutOutlined className="pr-2" />
                    {role === 5
                        ? "Đăng Xuất"
                        : role === 4
                        ? "Đăng Xuất"
                        : role === 3
                        ? "Đăng Xuất"
                        : " Đăng Nhập"}{" "}
                </div>
            ),
        },
    ];
    return (
        <div className="border-b shadow-lg">
            <div className="flex justify-between p-3 cursor-pointer">
                <Button
                    type="primary"
                    onClick={() => {
                        toggleCollapsed();
                    }}
                    style={{
                        marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <div>
                    <span>
                        <strong>
                            {role === 5
                                ? "Hi, MANAGER"
                                : role === 4
                                ? "Hi, USER"
                                : role === 3
                                ? "Hi, ADMIN"
                                : "Lỗi , Quay lại đăng nhập"}{" "}
                        </strong>
                    </span>

                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                        style={{ width: "300px" }}
                    >
                        <Avatar size={40} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Header;
