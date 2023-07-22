import React, { useState } from "react";
import { Button, Dropdown, Avatar } from "antd";
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
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
                    Đăng Xuất
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
                        Hi,{" "}
                        <strong>
                            {localStorage.getItem("role") === "5"
                                ? "MANAGER"
                                : localStorage.getItem("role") === "4"
                                ? "USER"
                                : "ADMIN"}{" "}
                        </strong>
                    </span>

                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottom"
                        style={{ width: "300px" }}
                    >
                        <Avatar size={50} icon={<UserOutlined />} />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default Header;
