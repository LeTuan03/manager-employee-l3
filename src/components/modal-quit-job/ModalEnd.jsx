import { Button, Modal, Tabs, message } from "antd";
import React, { useState } from "react";
import QuitJob from "./QuitJob";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/employee/employeeSlice";
import SendLeader from "../modal-send-leader/SendLeader";

const ModalEnd = () => {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    const [reasonForEnding, setReasonForEnding] = useState("");
    const items = [
        {
            key: "1",
            label: `ĐƠN XIN NGHỈ VIỆC`,
            children: (
                <QuitJob
                    reasonForEnding={reasonForEnding}
                    setReasonForEnding={setReasonForEnding}
                ></QuitJob>
            ),
        },
    ];
    return (
        <>
            <Modal
                zIndex={4}
                width={1160}
                className="max-h-[740px]"
                title="ĐƠN XIN NGHỈ VIỆC"
                centered
                open={open.modalEnd}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalEnd: false }));
                    setReasonForEnding("");
                }}
                footer={
                    <div className="flex justify-center pb-5">
                        <Button
                            type="primary"
                            className="min-w-[100px] bg-green-600 hover:!bg-green-500"
                            onClick={() => {
                                if (reasonForEnding) {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalSendLeader: true,
                                        })
                                    );
                                } else {
                                    message.error("Vui lòng nhập lí do");
                                }
                            }}
                        >
                            Trình lãnh đạo
                        </Button>
                        <Button
                            className="min-w-[100px]"
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(setOpen({ ...open, modalEnd: false }));
                                setReasonForEnding("");
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Tabs tabPosition={"left"} defaultActiveKey="1" items={items} />
            </Modal>
            <SendLeader
                reasonForEnding={reasonForEnding}
                setReasonForEnding={setReasonForEnding}
            ></SendLeader>
        </>
    );
};

export default ModalEnd;
