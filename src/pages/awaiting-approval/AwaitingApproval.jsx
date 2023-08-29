import React from "react";
import { Tabs } from "antd";
import IncreaseSalary from "../../components/awaiting-approval/IncreaseSalary";
import Promote from "../../components/awaiting-approval/Promote";
import Propose from "../../components/awaiting-approval/Propose";
import Resume from "../../components/awaiting-approval/Resume";

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
    return <Tabs items={items} />;
}
