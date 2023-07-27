import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getCurrentRole, getToken } from "../../services/api";
import { doLoginAction } from "../../redux/account/accountSlice";
import { useDispatch } from "react-redux";

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [messageApi, contextHolder] = message.useMessage();
    const notify = (message) => {
        messageApi.error(message);
    };
    const onFinish = async (values) => {
        try {
            const response = await getToken(values);
            localStorage.setItem("access_token", response.access_token);
            const role = await getCurrentRole();
            dispatch(doLoginAction(role?.data[0]));
            navigate("/");
        } catch (error) {
            notify("Sai tên tài khoản hoặc mật khẩu !!!");
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            navigate("/");
        } else {
            navigate("/login");
            localStorage.removeItem("access_token");
        }
    }, [navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-slate-900 text-white ">
            <div className="flex justify-center items-center bg-white p-4 rounded-xl pr-10 ">
                <img
                    src="https://www.naxeed.com/themes/default/images/login-img.png"
                    alt="banner"
                    className="w-40 h-40 p-10"
                />
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên tài khoản: "
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                        <Button className="ml-2">Đăng kí</Button>
                    </Form.Item>
                </Form>
            </div>
            {contextHolder}
        </div>
    );
}
