import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { searchEmployee } from "../../services/api";
import ModalInput from "../../components/ModalInput";
import { Button, Modal } from "antd";
import EmployeeProfile from "../../components/EmployeeProfile";
import ModalEnd from "../../components/ModalEnd";
import SaveResume from "../../components/SaveResume";
const PageEnd = () => {
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isOpenResume, setIsOpenResume] = useState(false);
    const [listEmployee, setListEmployee] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [send, setSend] = useState(false);
    const [openSendLeader, setOpenSendLeader] = useState(false);
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee("7,0");
        if (res?.status === 200) {
            setListEmployee(res?.data?.data);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEmployee();
    }, []);
    return (
        <>
            <ModalInput
                open={open}
                // setSend={setSend}
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
                setOpen={setOpen}
                setIsModalOpen={setIsModalOpen}
            ></ModalInput>
            <Table
                employeeId={employeeId}
                setEmployeeId={setEmployeeId}
                setOpen={setOpen}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
                setIsModalOpen={setIsModalOpen}
            ></Table>
            {employeeId && (
                <Modal
                    width={1300}
                    className="max-h-[720px] overflow-y-hidden"
                    title="Hồ sơ nhân viên"
                    centered
                    open={isModalOpen}
                    onOk={() => {
                        setIsModalOpen(false);
                    }}
                    onCancel={() => {
                        setIsModalOpen(false);
                    }}
                    footer={
                        <div className="flex justify-center">
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                            >
                                Hủy
                            </Button>
                            {isOpenResume && (
                                <Button
                                    type="primary"
                                    onClick={() => setIsResumeOpen(true)}
                                >
                                    Nộp lưu hồ sơ
                                </Button>
                            )}
                        </div>
                    }
                >
                    <EmployeeProfile
                        setOpenSendLeader={setOpenSendLeader}
                        openSendLeader={openSendLeader}
                        employeeId={employeeId}
                    ></EmployeeProfile>

                    <SaveResume
                        setIsOpenResume={setIsOpenResume}
                        employeeId={employeeId}
                        isResumeOpen={isResumeOpen}
                        setIsResumeOpen={setIsResumeOpen}
                    ></SaveResume>
                </Modal>
            )}
            <ModalEnd></ModalEnd>
        </>
    );
};

export default PageEnd;
