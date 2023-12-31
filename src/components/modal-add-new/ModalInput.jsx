import React, { useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import FormEmployee from "./FormEmployee";
import TabEmployeeFamily from "./TabEmployeeFamily";
import TabEmployeeCertificate from "./TabEmployeeCertificate";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/employee/employeeSlice";
import { TABS } from "../../constants/constants";
const ModalInput = () => {
    const [form] = Form.useForm();
    const [certificate, setCertificate] = useState([]);
    const [family, setFamily] = useState([]);
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState(TABS.MODALINPUT.CODE);
    const { open, employee } = useSelector((state) => state.employee);
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: (
                <FormEmployee
                    family={family}
                    certificate={certificate}
                    form={form}
                    setOpen={setOpen}
                    setActiveKey={setActiveKey}
                ></FormEmployee>
            ),
        },
        {
            key: "2",
            label: `QUAN HỆ GIA ĐÌNH`,
            children: (
                <TabEmployeeFamily
                    family={family}
                    setFamily={setFamily}
                ></TabEmployeeFamily>
            ),
        },
        {
            key: "3",
            label: `THÔNG TIN VĂN BẰNG`,
            children: (
                <TabEmployeeCertificate
                    certificate={certificate}
                    setCertificate={setCertificate}
                ></TabEmployeeCertificate>
            ),
        },
    ];
    const handleRegister = async () => {
        await form.validateFields();
        form.submit();
        dispatch(
            setOpen({
                ...open,
                modalProfile: true,
            })
        );
    };
    return (
        <>
            <Modal
                zIndex={1}
                title={
                    employee?.id
                        ? "CẬP NHẬT THÔNG TIN NHÂN VIÊN"
                        : "THÊM THÔNG TIN NHÂN VIÊN"
                }
                open={open.modalInput}
                centered
                width={1000}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalInput: false }));
                    setActiveKey(TABS.MODALINPUT.CODE);
                }}
                footer={
                    <div className="w-full flex justify-center gap-2 pb-5">
                        <Button
                            className="w-[100px]"
                            type="primary"
                            onClick={() => {
                                form.submit();
                                setActiveKey(TABS.MODALINPUT.CODE);
                            }}
                        >
                            {employee?.id ? "Lưu" : "Thêm"}
                        </Button>
                        {employee.submitProfileStatus && (
                            <Button
                                className=" w-[100px] bg-green-600 hover:!bg-green-500"
                                type="primary"
                                htmlType="submit"
                                onClick={() => handleRegister()}
                            >
                                Đăng ký
                            </Button>
                        )}
                        <Button
                            className="min-w-[100px]"
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(
                                    setOpen({ ...open, modalInput: false })
                                );
                                setActiveKey(TABS.MODALINPUT.CODE);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Tabs
                    activeKey={activeKey}
                    onChange={(key) => setActiveKey(key)}
                    items={items}
                />
            </Modal>
        </>
    );
};

export default ModalInput;
