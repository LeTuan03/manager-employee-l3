import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProcessChildren from "./ProcessChildren";
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
            children: <ProcessChildren data={data} />,
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
                                type="primary"
                                onClick={() => {
                                    setOpenLeader(true);
                                }}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}

                        <Button
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
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                        style={{ height: 600, overflowY: "scroll" }}
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
