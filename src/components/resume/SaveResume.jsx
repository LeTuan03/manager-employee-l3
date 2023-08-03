import { Button, DatePicker, Form, Modal, message } from "antd";
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
            profile.decisionDay = format(values.decisionDay.$d, "yyyy-MM-dd");
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
        const regexString = values;
        const escapedRegexString = regexString.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );
        const regexPattern = new RegExp("^" + escapedRegexString + "$");
        const testString = `NL${new Date()
            .getFullYear()
            .toString()
            .slice(-2)}${profile.code.slice(-3)}`;
        if (regexPattern.test(testString)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Nội dung không hợp lệ."));
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
                    <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                    />
                </Form.Item>

                <Form.Item
                    label="Số lưu:"
                    name={"numberSaved"}
                    rules={[
                        {
                            required: true,
                            message: `Không được bỏ trống trường này`,
                        },
                        {
                            validator: validateNumberSaved,
                            message: `Số lưu phải có định dạng NL-YY-XXX ví dụ: NL${new Date()
                                .getFullYear()
                                .toString()
                                .slice(-2)}${profile?.code?.slice(-3)}`,
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
                    <Button
                        type="primary"
                        danger
                        onClick={() =>
                            dispatch(setOpen({ ...open, modalResume: false }))
                        }
                    >
                        Hủy
                    </Button>
                    <Button htmlType="submit" type="primary" className="ml-2">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
