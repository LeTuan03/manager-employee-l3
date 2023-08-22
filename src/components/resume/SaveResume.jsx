import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { getEmployeeById, submitAndSaveResume } from "../../services/api";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    setIsLoading,
    setOpen,
} from "../../redux/employee/employeeSlice";
import { STATUS_EMPLOYEE } from "../../constants/constants";
import { validateNumberSaved } from "../common/Validate";
export default function SaveResume() {
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    const [profile, setProfile] = useState({});
    const [form] = Form.useForm();

    const handleGetProfile = async () => {
        try {
            const res = await getEmployeeById(employee.id);
            setProfile(res?.data?.data || {});
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetProfile();
    }, [employee.id]);

    const onFinish = async (values) => {
        try {
            dispatch(setIsLoading(true));
            const updatedProfile = {
                ...profile,
                ...values,
            };
            await submitAndSaveResume(updatedProfile);
            message.success("Nộp lưu hồ sơ thành công!");
            form.resetFields();
            dispatch(
                setOpen({
                    ...open,
                    modalResume: false,
                    modalProfile: false,
                })
            );
            dispatch(
                getAllEmployee({
                    status: `${STATUS_EMPLOYEE.SUBMIT_FILE_SAVE},${STATUS_EMPLOYEE.ACCEPT_REQUEST_END_PROFILE}`,
                })
            );

            dispatch(setIsLoading(false));
        } catch (error) {
            dispatch(setIsLoading(false));
            message.error("Nộp lưu hồ sơ thất bại!");
        }
    };

    const createValidator = () => (rule, value) => {
        return validateNumberSaved(rule, value, profile);
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
            zIndex={7}
        >
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                initialValues={{
                    remember: true,
                    decisionDay: format(new Date(), "yyyy-MM-dd"),
                    submitProfileStatus: STATUS_EMPLOYEE.SUBMIT_FILE_SAVE,
                }}
                form={form}
            >
                <Form.Item name="submitProfileStatus" className="hidden">
                    <Input />
                </Form.Item>
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
                            validator: createValidator(validateNumberSaved),
                        },
                    ]}
                >
                    <TextArea
                        className="mt-1"
                        autoSize={{
                            maxRows: 1,
                        }}
                        spellCheck={false}
                    />
                </Form.Item>
                <Form.Item className="text-center mt-6">
                    <Button htmlType="submit" type="primary">
                        Xác nhận
                    </Button>
                    <Button
                        className="ml-2 min-w-[100px]"
                        type="primary"
                        danger
                        onClick={() => {
                            dispatch(setOpen({ ...open, modalResume: false }));
                            form.resetFields();
                        }}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
