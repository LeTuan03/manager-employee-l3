import React, { useEffect, useState } from "react";
import {searchEmployee } from "../../services/api";
;
import ResumeComponent from "../resume/ResumeComponent";
import ModalInput from "../modal-add-new/ModalInput";

export default function Resume() {
    const [employeeId, setEmployeeId] = useState(null);
    const [open, setOpen] = useState(false);
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployee("2,6");
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
            <ModalInput employeeId={employeeId} open={open} setOpen={setOpen} />
            <ResumeComponent
                setEmployeeId={setEmployeeId}
                setOpen={setOpen}
                listEmployee={listEmployee}
                getAllEmployee={getAllEmployee}
                loading={loading}
                type="awaiting-approval"
            ></ResumeComponent>
        </>
    );
}
