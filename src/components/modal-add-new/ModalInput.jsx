import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Tabs } from "antd";
import FormEmployee from "./FormEmployee";
import TabEmployeeFamily from "./TabEmployeeFamily";
import TabEmployeeCertificate from "./TabEmployeeCertificate";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, resetEmployee, setOpen } from "../../redux/employee/employeeSlice";
const ModalInput = ({ employeeId, setEmployeeId }) => {
    const [form] = Form.useForm();
    const [certificate, setCertificate] = useState([]);
    const [family, setFamily] = useState([]);
    const dispatch = useDispatch()
    const { open,employee } = useSelector((state) => state.employee)
    
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: (
                <FormEmployee
                    family={family}
                    certificate={certificate}
                    form={form} setOpen={setOpen}
                    employeeId={employeeId}
                    setEmployeeId={setEmployeeId}
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
    const FooterModal = () => {
        return (
            <div className="w-full flex justify-center gap-2">
                <Button
                    onClick={() => {
                        dispatch(setOpen({ ...open, modalInput: false }))
                        setEmployeeId(null);
                        dispatch(resetEmployee())
                    }}
                >
                    Hủy
                </Button>
                {employee.submitProfileStatus && <Button onClick={() => {
                    dispatch(setOpen({ ...open, modalProfile: true }))
                }}>Đăng kí</Button>}
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
                open={open.modalInput}
                centered
                width={1000}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalInput: false }))
                    setEmployeeId(null);
                    dispatch(resetEmployee())
                }}
                footer={<FooterModal></FooterModal>}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
};

export default ModalInput;
