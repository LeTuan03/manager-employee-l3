import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { searchEmployee } from "../../services/api";
import ModalInput from "../../components/ModalInput";
import { Button } from "antd";
const AddUserPage = () => {
    const [listEmployee, setListEmployee] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee();
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
            <Button
                type="primary"
                className="mb-5"
                onClick={() => {
                    setOpen(true);
                }}
            >
                Thêm mới
            </Button>
            <ModalInput
                open={open}
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
                setOpen={setOpen}
                setIsModalOpen={setIsModalOpen}
            ></ModalInput>
            <Table
                setEmployeeId={setEmployeeId}
                setOpen={setOpen}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                
            ></Table>
        </>
    );
};

export default AddUserPage;
