import React from "react";
import { Tabs } from "antd";
import TabListCertificate from "./TabListCertificate";
import TabCV from "./TabCV";
import TabProfile from "./TabProfile";
export default function EmployeeProfile({
    setThreeInfo,
    threeInfo,
    activeKey,
    setActiveKey,
    setErrorThreeInfo,
    errorThreeInfo,
}) {
    const items = [
        {
            key: "1",
            label: `HỒ SƠ`,
            children: (
                <TabProfile
                    threeInfo={threeInfo}
                    setThreeInfo={setThreeInfo}
                    setErrorThreeInfo={setErrorThreeInfo}
                    errorThreeInfo={errorThreeInfo}
                ></TabProfile>
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
            <Tabs
                tabPosition="left"
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={items}
            />
        </>
    );
}
