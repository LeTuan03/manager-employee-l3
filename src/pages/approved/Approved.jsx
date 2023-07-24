import React, { useEffect, useState } from "react";

import { getListApproved } from "../../services/api";
import TableComponet from "../../components/Table";

export default function Approved() {
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
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
        <TableComponet
            listEmployee={listEmployee}
            getAllEmployee={getAllEmployee}
            loading={loading}
            type={"approved"}
        ></TableComponet>
    );
}
