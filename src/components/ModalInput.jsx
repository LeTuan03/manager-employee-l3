import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import FormEmployee from "./FormEmployee";
import TabEmployeeFamily from "./TabEmployeeFamily";
import TabEmployeeCertificate from "./TabEmployeeCertificate";
import { getEmployeeById } from "../services/api";
const ModalInput = ({
    setOpen,
    open,
    employeeId,
    setEmployeeId,
    setIsModalOpen,
}) => {
    const [form] = Form.useForm();
    const [employee, setEmployee] = useState({});
    const [certificate, setCertificate] = useState([]);
    const [family, setFamily] = useState([]);
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: (
                <FormEmployee
                    family={family}
                    certificate={certificate}
                    employee={employee}
                    form={form}
                    setOpen={setOpen}
                    employeeId={employeeId}
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
                    employee={employee}
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
                    employee={employee}
                ></TabEmployeeCertificate>
            ),
        },
    ];
    const getEmployee = async () => {
        if (employeeId !== null) {
            const res = await getEmployeeById(employeeId);
            setEmployee(res?.data?.data);
        }
    };
    useEffect(() => {
        getEmployee();
    }, [employeeId]);
    const FooterModal = () => {
        return (
            <div className="w-full flex justify-center gap-2">
                <Button
                    onClick={() => {
                        setOpen(false);
                        setEmployeeId(null);
                        setEmployee({});
                    }}
                >
                    Hủy
                </Button>
                {employee.submitProfileStatus && (
                    <Button
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        Đăng kí
                    </Button>
                )}
                <Button
                    type="primary"
                    onClick={() => {
                        form.submit();
                    }}
                >
                    Thêm
                </Button>
            </div>
        );
    };
    return (
        <>
            <Modal
                title={
                    employeeId
                        ? "CẬP NHẬT THÔNG TIN NHÂN VIÊN"
                        : "THÊM THÔNG TIN NHÂN VIÊN"
                }
                open={open}
                centered
                width={1000}
                onCancel={() => {
                    setOpen(false);
                    setEmployeeId(null);
                    setEmployee({});
                }}
                footer={<FooterModal></FooterModal>}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
};

export default ModalInput;
