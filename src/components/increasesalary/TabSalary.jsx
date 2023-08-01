import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import IncreaseSalaryChildren from "./IncreaseSalaryChildren";
import SendLeader2 from "../modal-send-leader/SendLeader2";

const TabSalary = ({
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
            children: <IncreaseSalaryChildren data={data} />,
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
                        <Button
                            type="primary"
                            onClick={() => {
                                setOpenLeader(true);
                            }}
                        >
                            Trình lãnh đạo
                        </Button>

                        <Button
                            key="cancel"
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
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                        style={{ height: 600, overflowY: "scroll" }}
                    />
                </div>
            </Modal>

            <SendLeader2
                type="salary"
                data={data}
                employeeId={employee.id}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
            />
        </>
    );
};

export default TabSalary;
