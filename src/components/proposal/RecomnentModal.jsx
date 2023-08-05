import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProposeTab from "./RecomenetChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";

const RecomnentModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    employee,
    handleGetRecomentByEmp,
}) => {
    const items = [
        {
            key: "1",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <ProposeTab profile={data} />,
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
                        {[1, 4, 5].includes(data.proposalStatus) && (
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
                type="recoment"
                data={data}
                employeeId={employee.id}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
export default RecomnentModal;
