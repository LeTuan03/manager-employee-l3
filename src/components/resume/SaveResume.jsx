import { Button, DatePicker, Form, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { getEmployeeById, submitAndSaveResume } from "../../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";

export default function SaveResume({
    isResumeOpen,
    setIsResumeOpen,
    employeeId,
}) {
    const dispatch = useDispatch()
    const [profile, setProfile] = useState({});
    const handleGetProfile = async () => {
        const res = await getEmployeeById(employeeId);
        setProfile(res?.data?.data);
    };
    useEffect(() => {
        handleGetProfile();
    }, [employeeId]);

    const onFinish = async (values) => {
        try {
            profile.decisionDay = format(
                new Date(values.decisionDay.$d).getTime(),
                "yyyy-MM-dd"
            );
            profile.numberSaved = values.numberSaved;
            profile.submitProfileStatus = "0";
            const res = await submitAndSaveResume(profile);
            message.success("Nộp lưu hồ sơ thành công!");
            setIsResumeOpen(false);
            dispatch(getAllEmployee("7,0"))
        } catch (error) {
            message.error("Nộp lưu hồ sơ thất bại!");
        }
    };
    const onFinishFailed = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
        <Modal
            title="NỘP LƯU HỒ SƠ"
            centered
            open={isResumeOpen}
            onCancel={() => setIsResumeOpen(false)}
            footer={false}
        >
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                name="basic"
                onFinishFailed={onFinishFailed}
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
                            message: "Bạn cần nhập trường này",
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
                <Form.Item className="text-right">
                    <Button
                        type="primary"
                        danger
                        onClick={() => setIsResumeOpen(false)}
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
