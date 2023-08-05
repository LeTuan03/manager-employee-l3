import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import IncreaseTab from "./IncreaseSalaryChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";

const SalaryModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    employee,
    handleGetSalaryByEmp,
}) => {
    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: <IncreaseTab profile={data} />,
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
                        {[1, 4, 5].includes(data.salaryIncreaseStatus) && (
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
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
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
                type="salary"
                data={data}
                employeeId={employee.id}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};

export default SalaryModal;
