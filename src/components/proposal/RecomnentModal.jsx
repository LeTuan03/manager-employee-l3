import { Button, Modal, Tabs } from "antd";
import { useState } from "react";

import RecomenetChildren from "./RecomenetChildren";
import SendLeader from "../modal-send-leader/SendLeader";

const RecomnentModal = ({
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
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <RecomenetChildren data={data} />,
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
                    {
                        setIsModalOpen(false);
                        setPresent(false);
                    }
                }}
                footer={
                    <div className="text-center">
                        {present && (
                            <Button
                                key="cancel"
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
            <SendLeader
                employee={employee}
                openSendLeader={openModal}
                setOpenSendLeader={setOpenModal}
            />
        </>
    );
};
export default RecomnentModal;
