import React, { useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import FormEmployee from "./FormEmployee";
import TabEmployeeFamily from "./TabEmployeeFamily";
import TabEmployeeCertificate from "./TabEmployeeCertificate";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, setOpen } from "../../redux/employee/employeeSlice";
const ModalInput = () => {
    const [form] = Form.useForm();
    const [certificate, setCertificate] = useState([]);
    const [family, setFamily] = useState([]);
    const dispatch = useDispatch();
    const [activeKey, setActiveKey] = useState("1");
    const { open, employee } = useSelector((state) => state.employee);
    const [loading, setLoading] = useState(false);
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: (
                <FormEmployee
                    setLoading={setLoading}
                    family={family}
                    certificate={certificate}
                    form={form}
                    setOpen={setOpen}
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
                    setActiveKey("1");
                }}
                footer={
                    <div className="w-full flex justify-center gap-2">
                        <Button
                            className=" w-[100px] bg-green-600 hover:!bg-green-500"
                            loading={loading}
                            type="primary"
                            onClick={() => {
                                form.submit();
                            }}
                        >
                            {employee?.id ? "Lưu" : "Thêm"}
                        </Button>
                        {employee.submitProfileStatus && (
                            <Button
                                className=" w-[100px]"
                                type="primary"
                                onClick={() => {
                                    dispatch(getEmployee(employee?.id));
                                    dispatch(
                                        setOpen({ ...open, modalProfile: true })
                                    );
                                }}
                            >
                                Đăng kí
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
                                setActiveKey("1");
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
