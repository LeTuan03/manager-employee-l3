import React from "react";
import { Button, Dropdown, Avatar } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
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
        <div className="border-b shadow-lg fixed top-0 py-3 w-[85%] z-[1] bg-white max-lg:w-full max-md:w-full max-md:mr-10 max-lg:mr-3 font-mono">
            <div className="flex justify-end items-center mr-4">
                <strong className="font-mono leading-3">
                    {role === 5
                        ? "Chào, MANAGER"
                        : role === 4
                        ? "Chào, USER"
                        : role === 3
                        ? "Chào, ADMIN"
                        : "Lỗi , Quay lại đăng nhập"}{" "}
                </strong>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    className="w-[300px] ml-5"
                >
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
