import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { getListWaitApprove } from "../../services/api";
import ResumeComponent from "../../components/ResumeComponent";
import IncreaseSalary from "../../components/IncreaseSalary";
import Promote from "../../components/Promote";
import Propose from "../../components/Propose";
import ModalInput from "../../components/ModalInput";

export default function AwaitingApproval() {
    const [employeeId, setEmployeeId] = useState(null);
    const [open, setOpen] = useState(false);
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
                <>
                    <ModalInput
                        employeeId={employeeId}
                        open={open}
                        setOpen={setOpen}
                    />
                    <ResumeComponent
                        setEmployeeId={setEmployeeId}
                        setOpen={setOpen}
                        listEmployee={listEmployee}
                        getAllEmployee={getAllEmployee}
                        loading={loading}
                        type="awaiting-approval"
                    ></ResumeComponent>
                </>
                // <ResumeComponent
                //     listEmployee={listEmployee}
                //     getAllEmployee={getAllEmployee}
                //     loading={loading}
                //     type="awaiting-approval"
                // ></ResumeComponent>
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
