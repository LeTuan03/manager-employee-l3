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
                decisionDay: values.decisionDay,
                numberSaved: values.numberSaved,
                submitProfileStatus: STATUS_EMPLOYEE.SUBMIT_FILE_SAVE,
            };
            await submitAndSaveResume(updatedProfile);
            message.success("Nộp lưu hồ sơ thành công!");
            dispatch(
                setOpen({
                    ...open,
                    modalResume: false,
                    modalProfile: false,
                })
            );
            form.resetFields();
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

    const validateNumberSaved = (_, value) => {
        if (value) {
            const regexString = value;
            const escapedRegexString = regexString.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );
            const regexPattern = new RegExp("^" + escapedRegexString + "$");
            const testString = `NL${
                new Date().getMonth() + 1 < 10
                    ? "0" + (new Date().getMonth() + 1)
                    : new Date().getMonth() + 1
            }${new Date()
                .getFullYear()
                .toString()
                .slice(-2)}/${profile?.code?.slice(-3)}`;
            if (regexPattern.test(testString)) {
                return Promise.resolve();
            } else {
                return Promise.reject(
                    new Error(
                        `Số lưu phải có định dạng NL-MM-YY-/-XXX ví dụ: ${testString}`
                    )
                );
            }
        } else {
            return Promise.reject(new Error("Không được để trống trường này!"));
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
            zIndex={7}
        >
            <Form
                onFinish={onFinish}
                layout={"vertical"}
                initialValues={{
                    remember: true,
                    decisionDay: format(new Date(), "yyyy-MM-dd"),
                }}
                form={form}
            >
                <Form.Item name="submitProfileStatus" className="hidden">
                    <Input value={"STATUS_EMPLOYEE.SUBMIT_FILE_SAVE"} />
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
