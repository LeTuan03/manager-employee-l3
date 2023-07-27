import React, { useEffect, useState } from "react";

import { getListApproved } from "../../services/api";
import TableComponet from "../../components/Table";
import { Button, Modal } from "antd";
import EmployeeProfile from "../../components/EmployeeProfile";

export default function Approved() {
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    const getAllEmployee = async () => {
        setLoading(true);
        const res = await getListApproved();
        if (res?.status === 200) {
            setListEmployee(res?.data?.data);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEmployee();
    }, []);
    return (
        <div>
            <TableComponet
                setEmployeeId={setEmployeeId}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
                setIsModalOpen={setIsModalOpen}
                type={"approved"}
            ></TableComponet>
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
                        </div>
                    }
                >
                    <EmployeeProfile employeeId={employeeId}></EmployeeProfile>
                </Modal>
            )}
        </div>
    );
}
