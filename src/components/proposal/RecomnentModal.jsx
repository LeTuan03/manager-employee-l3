import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import RecomenetChildren from "./RecomenetChildren";
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
            children: <RecomenetChildren data={data} />,
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
