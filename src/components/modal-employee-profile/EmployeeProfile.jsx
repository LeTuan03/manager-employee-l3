import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import TabListCertificate from "./TabListCertificate";
import TabCV from "./TabCV";
import TabProfile from "./TabProfile";
export default function EmployeeProfile({ setThreeInfo, threeInfo }) {
    const [tabPosition, setTabPosition] = useState('left');
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setTabPosition('left');
            } else {
                setTabPosition('top');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            children: (
                <TabProfile threeInfo={threeInfo}
                    setThreeInfo={setThreeInfo}></TabProfile>
            ),
        },
        {
            key: "2",
            label: `SƠ YẾU LÍ LỊCH`,
            children: <TabCV></TabCV>,
        },
        {
            key: "3",
            label: `DANH SÁCH VĂN BẰNG`,
            children: <TabListCertificate></TabListCertificate>,
        },
    ];
    return (
        <>
            <Tabs tabPosition={tabPosition} defaultActiveKey="1" items={items} />
        </>
    );
}
