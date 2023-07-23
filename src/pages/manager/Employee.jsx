import React, { useEffect, useState } from "react";
import { searchEmployee } from "../../services/api";
import ModalInput from "../../components/ModalInput";
import TableComponet from "../../components/Table";

const Employee = () => {
    const [listEmployee, setListEmployee] = useState([]);
    const [employeeId, setEmployeeId] = useState(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
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
            <TableComponet
                setEmployeeId={setEmployeeId}
                setOpen={setOpen}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
            ></TableComponet>
        </>
    );
};

export default Employee;
