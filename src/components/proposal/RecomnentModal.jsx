import { Button, Modal, Tabs } from "antd";
import { useState } from "react";

import RecomenetChildren from "./RecomenetChildren";
import SendLeader from "../modal-send-leader/SendLeader";
import { useDispatch } from "react-redux";
import { setOpen } from "../../redux/employee/employeeSlice";

const RecomnentModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
    employee,
}) => {
    const dispatch = useDispatch();
    const items = [
        {
            key: "1",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <RecomenetChildren data={data} />,
        },
    ];
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
                                onClick={() => {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalSendLeader: true,
                                        })
                                    );
                                }}
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
            <SendLeader open={open} />
        </>
    );
};
export default RecomnentModal;
