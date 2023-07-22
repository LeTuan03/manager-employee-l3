import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { searchEmployee } from "../../services/api";
import ModalInput from "../../components/ModalInput";
import TableComponetEmp from "../../components/TableEmployee";

const Employee = () => {
    const [listEmployee, setListEmployee] = useState([]);
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
            <ModalInput
                employeeId={employeeId}
                open={open}
                setOpen={setOpen}
            ></ModalInput>
            <TableComponetEmp
                setEmployeeId={setEmployeeId}
                setOpen={setOpen}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
            ></TableComponetEmp>
        </>
    );
};

export default Employee;
