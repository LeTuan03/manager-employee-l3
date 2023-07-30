import { Button, Modal, Tabs } from "antd";
import { useState } from "react";

import ProcessChildren from "./ProcessChildren";
import SendLeader from "../modal-send-leader/SendLeader";
import { setOpen } from "../../redux/employee/employeeSlice";
import { useDispatch } from "react-redux";

const ProcessModal = ({
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
            label: `THĂNG CHỨC`,
            children: <ProcessChildren data={data} />,
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
                    setIsModalOpen(false);
                    setPresent(false);
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
        </>
    );
};
export default ProcessModal;
