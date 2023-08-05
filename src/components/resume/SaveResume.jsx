import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { getEmployeeById, submitAndSaveResume } from "../../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";

export default function SaveResume({ employeeId, setEmployeeId }) {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    const [profile, setProfile] = useState({});
    const [form] = Form.useForm();
    const handleGetProfile = async () => {
        const res = await getEmployeeById(employeeId);
        setProfile(res?.data?.data);
    };

    useEffect(() => {
        handleGetProfile();
    }, [employeeId]);

    const onFinish = async (values) => {
        try {
            profile.decisionDay = values.decisionDay;
            profile.numberSaved = values.numberSaved;
            profile.submitProfileStatus = "0";
            await submitAndSaveResume(profile);
            message.success("Nộp lưu hồ sơ thành công!");
            dispatch(
                setOpen({ ...open, modalResume: false, modalProfile: false })
            );
            form.resetFields();
            dispatch(getAllEmployee("7,0"));
            setEmployeeId(null);
        } catch (error) {
            console.log(error);
            message.error("Nộp lưu hồ sơ thất bại!");
        }
    };
    const onFinishFailed = (values) => {
        console.log("Received values of form: ", values);
    };
    const validateNumberSaved = (_, values) => {
        if (values) {
            const regexString = values;
            const escapedRegexString = regexString.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );
            const regexPattern = new RegExp("^" + escapedRegexString + "$");
            const testString = `NL${new Date()
                .getFullYear()
                .toString()
                .slice(-2)}${
                new Date().getMonth() + 1 < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1
            }${profile?.code?.slice(-3)}`;
            if (regexPattern.test(testString)) {
                return Promise.resolve();
            } else {
                return Promise.reject(
                    new Error(
                        `Số lưu phải có định dạng NL-YY-XXX ví dụ: NL${new Date()
                            .getFullYear()
                            .toString()
                            .slice(-2)}${
                            new Date().getMonth() + 1 < 10
                                ? "0" + (new Date().getMonth() + 1)
                                : new Date().getMonth() + 1
                        }${profile?.code?.slice(-3)}`
                    )
                );
            }
        } else {
            return Promise.reject(
                new Error("Không được để trống trường này!.")
            );
        }
    };
    return (
        <Modal
            title="NỘP LƯU HỒ SƠ"
            centered
            open={open.modalResume}
            onCancel={() => {
                dispatch(setOpen({ ...open, modalResume: false }));
                form.resetFields();
            }}
            footer={false}
        >
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                name="basic"
                onFinishFailed={onFinishFailed}
                initialValues={{
                    remember: true,
                    decisionDay: format(new Date(), "yyyy-MM-dd"),
                }}
                form={form}
            >
                <Form.Item
                    label="Ngày quyết định"
                    name="decisionDay"
                    rules={[
                        {
                            required: true,
                            message: "Bạn cần nhập trường này",
                        },
                    ]}
                >
                    <Input
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                        type="date"
                    />
                </Form.Item>

                <Form.Item
                    label="Số lưu:"
                    name={"numberSaved"}
                    rules={[
                        {
                            validator: validateNumberSaved,
                        },
                    ]}
                >
                    <TextArea
                        className="mt-1"
                        autoSize={{
                            maxRows: 1,
                        }}
                    />
                </Form.Item>
                <Form.Item className="text-center">
                    <Button htmlType="submit" type="primary">
                        Xác nhận
                    </Button>
                    <Button
                        className="ml-2 min-w-[100px]"
                        type="primary"
                        danger
                        onClick={() =>
                            dispatch(setOpen({ ...open, modalResume: false }))
                        }
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
