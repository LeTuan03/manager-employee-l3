import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabListCertificate from "./TabListCertificate";
import TabProfile from "./TabProfile2";
import { getEmployeeById } from "../../services/api";
import TabCV2 from "./TabCV2";
export default function EmployeeProfile({ employeeId }) {
    const [employee, setEmployee] = useState({});
    const [tabPosition, setTabPosition] = useState("left");
    const getEmployee = async () => {
        if (employeeId !== null) {
            const res = await getEmployeeById(employeeId);
            setEmployee(res?.data?.data);
        }
    };
    useEffect(() => {
        getEmployee();
    }, [employeeId]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setTabPosition("left");
            } else {
                setTabPosition("top");
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            children: <TabProfile employee={employee}></TabProfile>,
        },
        {
            key: "2",
            label: `SƠ YẾU LÍ LỊCH`,
            children: <TabCV2 employee={employee}></TabCV2>,
        },
        {
            key: "3",
            label: `DANH SÁCH VĂN BẰNG`,
            children: <TabListCertificate type={employee}></TabListCertificate>,
        },
    ];
    return (
        <>
            <Tabs
                defaultActiveKey="1"
                tabPosition={tabPosition}
                items={items}
            />
        </>
    );
}
