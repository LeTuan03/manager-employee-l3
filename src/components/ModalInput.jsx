import React, { useEffect, useState } from "react";
import { Form, Modal, Tabs } from "antd";
import FormEmployee from "./FormEmployee";
import TabEmployeeFamily from "./TabEmployeeFamily";
import TabEmployeeCertificate from "./TabEmployeeCertificate";
import { getEmployeeById } from "../services/api";
const ModalInput = ({ setOpen, open, employeeId }) => {
    const [form] = Form.useForm();
    const [employee, setEmployee] = useState({})
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: <FormEmployee employee={employee} form={form}></FormEmployee>,
        },
        {
            key: "2",
            label: `QUAN HỆ GIA ĐÌNH`,
            children: <TabEmployeeFamily employee={employee}></TabEmployeeFamily>,
        },
        {
            key: "3",
            label: `THÔNG TIN VĂN BẰNG`,
            children: <TabEmployeeCertificate employee={employee}></TabEmployeeCertificate>,
        },
    ];

    const getEmployee = async () => {
        if (employeeId!==null) {
            const res = await getEmployeeById(employeeId)
            setEmployee(res?.data?.data)
        }
    }
    useEffect(() => {
        getEmployee()
    }, [employeeId]);
    return (
        <>
            <Modal
                title="CẬP NHẬT THÔNG TIN NHÂN VIÊN"
                open={open}
                centered
                width={1000}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                okText={"Sửa"}
                cancelText={"Hủy"}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
};

export default ModalInput;
