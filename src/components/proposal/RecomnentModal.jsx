import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProposeTab from "./RecomenetChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";
import PromoteTab from "../process/ProcessChildren";
import { STATUS_EMPLOYEE } from "../../constants/constants";

const ModalUpdateHappening = ({
    type,
    isModalOpen,
    setIsModalOpen,
    data,
    employee,
    handleGetRecomentByEmp,
    handleGetProcessByEmp,
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
                    <div className="text-center">
                        {type === "recoment" &&
                            [1, 4, 5].includes(data.proposalStatus) && (
                                <Button
                                    className="min-w-[100px]"
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
                                    className="min-w-[100px]"
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
                employeeId={employee.id}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
                handleGetProcessByEmp={handleGetProcessByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
export default ModalUpdateHappening;

const getTitle = (type) => {
    switch (type) {
        case "recoment":
            return `ĐỀ XUẤT/THAM MƯU`;
        case "process":
            return `THĂNG CHỨC`;

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
        default:
            break;
    }
};
