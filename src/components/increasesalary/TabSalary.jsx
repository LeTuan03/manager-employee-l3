import { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import IncreaseSalaryChildren from "./IncreaseSalaryChildren";
import SendLeader from "../modal-send-leader/SendLeader";

const TabSalary = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
    employee,
}) => {
    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: <IncreaseSalaryChildren data={data} />,
        },
    ];

    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={present || isModalOpen}
                width={1300}
                onCancel={() => {
                    setIsModalOpen(false);
                    setPresent(false);
                }}
                footer={
                    <div className="text-center">
                        {present && (
                            <Button
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => {
                                setIsModalOpen(false);
                                setPresent(false);
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
            <SendLeader
                employee={employee}
                openSendLeader={openModal}
                setOpenSendLeader={setOpenModal}
            />
        </>
    );
};

export default TabSalary;
