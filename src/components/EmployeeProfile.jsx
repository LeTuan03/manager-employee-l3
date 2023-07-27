import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabCV from "./TabCV";
import TabProfile from "./TabProfile";
import { getEmployeeById } from "../services/api";
import SendLeader from "./SendLeader";
import TabListCertificate from "./TabListCertificate";
export default function EmployeeProfile({
    employeeId,
    setOpenSendLeader,
    openSendLeader,
}) {
    // nếu sử dụng context thì có thể cho vào component ModalInput sẽ đúng nhất
    // 1 api get employee byid , 1 api exp
    const [employee, setEmployee] = useState({});
    const [skillActivity, setSkillActivity] = useState({});
    const getEmployee = async () => {
        if (employeeId !== null) {
            const res = await getEmployeeById(employeeId);
            setEmployee(res?.data?.data);
        }
    };
    useEffect(() => {
        getEmployee();
    }, [employeeId]);
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            // cái này render cùng với Tabs cha nên chú ý truyền props
            children: (
                <TabProfile
                    skillActivity={skillActivity}
                    setSkillActivity={setSkillActivity}
                    employee={employee}
                ></TabProfile>
            ),
        },
        {
            key: "2",
            label: `SƠ YẾU LÍ LỊCH`,
            children: <TabCV employee={employee}></TabCV>,
        },
        {
            key: "3",
            label: `DANH SÁCH VĂN BẰNG`,
            children: (
                <TabListCertificate employee={employee}></TabListCertificate>
            ),
        },
    ];
    return (
        <>
            <Tabs tabPosition={"left"} defaultActiveKey="1" items={items} />
            {openSendLeader && (
                <SendLeader
                    setOpenSendLeader={setOpenSendLeader}
                    openSendLeader={openSendLeader}
                    employee={employee}
                ></SendLeader>
            )}
        </>
    );
}
