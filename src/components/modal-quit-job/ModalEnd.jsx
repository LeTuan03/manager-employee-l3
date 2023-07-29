import { Button, Modal, Tabs } from "antd";
import React from "react";
import QuitJob from "./QuitJob";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../../redux/employee/employeeSlice";

const ModalEnd = ({ employeeId, reasonForEnding, setReasonForEnding }) => {
    const dispatch = useDispatch()
    const { open } = useSelector((state) => state.employee)
    const items = [
        {
            key: "1",
            label: `ĐƠN XIN NGHỈ VIỆC`,
            children: (
                <QuitJob
                    reasonForEnding={reasonForEnding}
                    setReasonForEnding={setReasonForEnding}
                    employeeId={employeeId}
                ></QuitJob>
            ),
        },
    ];
    return (
        <>
            <Modal
                width={1160}
                className="max-h-[740px] overflow-y-hidden"
                title="ĐƠN XIN NGHỈ VIỆC"
                centered
                open={open.modalEnd}
                // onOk={() => {
                //     setIsModalOpen(false);
                // }}
                onCancel={() => {
                    // setOpen({...open,modalEnd:false})
                    dispatch(setOpen({ ...open, modalEnd: false }))
                }}
                footer={
                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                dispatch(setOpen({ ...open, modalEnd: false }))
                                // setOpen({...open,modalEnd:false})
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => {
                                // setOpenSendLeader(true);
                                // setOpen({...open,modalSendLeader:true})
                                dispatch(setOpen({ ...open, modalSendLeader: true }))
                            }}
                        >
                            Trình lãnh đạo
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
