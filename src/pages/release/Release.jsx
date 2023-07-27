import React, { useEffect, useState } from "react";
import TableComponet from "../../components/Table";
import { searchEmployeeEnd } from "../../services/api";

export default function Release() {
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await searchEmployeeEnd();
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
                listEmployee={listEmployee}
                // getAllEmployee={getAllEmployee}
                loading={loading}
                type="Release"
            ></TableComponet>
        </div>
    );
}
