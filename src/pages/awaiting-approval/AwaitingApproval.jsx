import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { getListWaitApprove } from "../../services/api";
import TableComponet from "../../components/Table";
import IncreaseSalary from "../../components/IncreaseSalary";
import Promote from "../../components/Promote";
import Propose from "../../components/Propose";

export default function AwaitingApproval() {
    const [listEmployee, setListEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllEmployee = async () => {
        setLoading(true);
        const res = await getListWaitApprove();
        if (res?.status === 200) {
            setListEmployee(res?.data?.data);
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllEmployee();
    }, []);
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            children: (
                <TableComponet
                    listEmployee={listEmployee}
                    getAllEmployee={getAllEmployee}
                    loading={loading}
                    type="awaiting-approval"
                ></TableComponet>
            ),
        },
        {
            key: "2",
            label: `TĂNG LƯƠNG`,
            children: <IncreaseSalary />,
        },
        {
            key: "3",
            label: `THĂNG CHỨC`,
            children: <Promote />,
        },
        {
            key: "4",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <Propose />,
        },
    ];
    return <Tabs defaultActiveKey="1" items={items} />;
}
