import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProposeTab from "../proposal/RecomenetChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";
import PromoteTab from "../process/ProcessChildren";
import { STATUS_EMPLOYEE } from "../../constants/constants";
import IncreaseTab from "../increasesalary/IncreaseSalaryChildren";

const FormUpdateHappening = ({
    type,
    isModalOpen,
    setIsModalOpen,
    data,
    handleGetRecomentByEmp,
    handleGetProcessByEmp,
    handleGetSalaryByEmp,
}) => {
    const { NEW_SAVE, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
    const items = [
        {
            key: "1",
            label: getTitle(type),
            children: getChild(type, data),
        },
    ];
    const [openLeader, setOpenLeader] = useState("");

    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <div className="text-center pb-5">
                        {type === "recoment" &&
                            [1, 4, 5].includes(data.proposalStatus) && (
                                <Button
                                    className="min-w-[100px] bg-green-600 hover:!bg-green-500"
                                    type="primary"
                                    onClick={() => {
                                        setOpenLeader(true);
                                    }}
                                >
                                    Trình lãnh đạo
                                </Button>
                            )}
                        {type === "process" &&
                            [
                                NEW_SAVE,
                                ADDITIONAL_REQUIREMENTS,
                                REJECT,
                            ].includes(data.processStatus) && (
                                <Button
                                    className="min-w-[100px] bg-green-600 hover:!bg-green-500"
                                    type="primary"
                                    onClick={() => {
                                        setOpenLeader(true);
                                    }}
                                >
                                    Trình lãnh đạo
                                </Button>
                            )}
                        {type === "salary" &&
                            [1, 4, 5].includes(data.salaryIncreaseStatus) && (
                                <Button
                                    className="min-w-[100px]  bg-green-600 hover:!bg-green-500"
                                    type="primary"
                                    onClick={() => {
                                        setOpenLeader(true);
                                    }}
                                >
                                    Trình lãnh đạo
                                </Button>
                            )}
                        <Button
                            className="min-w-[100px]"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div className="mt-10">
                    <Tabs
                        style={{ height: 600, overflowY: "scroll" }}
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                    />
                </div>
            </Modal>
            <SendLeaderUpdateHappening
                type={type}
                data={data}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
                handleGetProcessByEmp={handleGetProcessByEmp}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
export default FormUpdateHappening;

const getTitle = (type) => {
    switch (type) {
        case "recoment":
            return `ĐỀ XUẤT/THAM MƯU`;
        case "process":
            return `THĂNG CHỨC`;
        case "salary":
            return `TĂNG LƯƠNG`;
        default:
            break;
    }
};

const getChild = (type, data) => {
    switch (type) {
        case "recoment":
            return <ProposeTab profile={data} />;
        case "process":
            return <PromoteTab profile={data} />;
        case "salary":
            return <IncreaseTab profile={data} />;
        default:
            break;
    }
};
