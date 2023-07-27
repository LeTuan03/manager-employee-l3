import React from "react";
import { Tabs } from "antd";
import IncreaseSalary from "../../components/IncreaseSalary";
import Promote from "../../components/Promote";
import Propose from "../../components/Propose";
import Resume from "../../components/Resume";

export default function AwaitingApproval() {
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            children: <Resume />,
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
