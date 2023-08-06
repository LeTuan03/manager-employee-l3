import { Button, Modal, Tabs, message } from "antd";
import React from "react";
import QuitJob from "./QuitJob";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/employee/employeeSlice";

const ModalEnd = ({ reasonForEnding, setReasonForEnding }) => {
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
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
                className="max-h-[740px] overflow-y-hidden"
                title="ĐƠN XIN NGHỈ VIỆC"
                centered
                open={open.modalEnd}
                onCancel={() => {
                    dispatch(setOpen({ ...open, modalEnd: false }));
                    setReasonForEnding("");
                }}
                footer={
                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            className="min-w-[100px]"
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
        </>
    );
};

export default ModalEnd;
