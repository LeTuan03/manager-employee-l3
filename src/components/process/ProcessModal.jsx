import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import PromoteTab from "./ProcessChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";

const ProcessModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    employee,
    handleGetProcessByEmp,
}) => {
    const items = [
        {
            key: "1",
            label: `THĂNG CHỨC`,
            children: <PromoteTab profile={data} />,
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
                        {["1", "4", "5"].includes(data.processStatus) && (
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
                employeeId={employee.id}
                type="process"
                data={data}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetProcessByEmp={handleGetProcessByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
export default ProcessModal;
