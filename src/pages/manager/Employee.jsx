import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { searchEmployee } from "../../services/api";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button, Modal } from "antd";
import EmployeeProfile from "../../components/modal-employee-profile/EmployeeProfile";
import ModalEnd from "../../components/modal-quit-job/ModalEnd";
import SendLeader from "../../components/modal-send-leader/SendLeader";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";
import UpdateHappeningModal from "../../components/update-happening/UpdateHappeningModal";
const Employee = () => {
    const [employeeId, setEmployeeId] = useState(null);
    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { open } = useSelector((state) => state.employee)
    const [reasonForEnding, setReasonForEnding] = useState("");
    useEffect(() => {
        dispatch(getAllEmployee("3,6,8,9"))
    }, []);
    return (
        <>
            <ModalInput
                setEmployeeId={setEmployeeId}
                employeeId={employeeId}
            ></ModalInput>
            <Table
                setEmployeeId={setEmployeeId}
            ></Table>
            {employeeId && (
                <Modal
                    width={1300}
                    className="max-h-[720px] overflow-y-hidden"
                    title="Hồ sơ nhân viên"
                    centered
                    open={open.modalProfile}
                    onOk={() => {
                        dispatch(setOpen({ ...open, modalProfile: false }))
                    }}
                    onCancel={() => {
                        dispatch(setOpen({ ...open, modalProfile: false }))
                    }}
                    footer={
                        <div className="flex justify-center">
                            <Button
                                danger
                                onClick={() => {
                                    dispatch(setOpen({ ...open, modalProfile: false }))
                                }}
                            >
                                Hủy
                            </Button>
                            <Button //3,4,9
                                danger
                                onClick={() => {
                                    dispatch(setOpen({ ...open, modalEnd: true }))
                                }}
                            >
                                Kết thúc
                            </Button>
                            <Button
                                htmlType="submit"
                                type="primary"
                                onClick={() => {
                                    dispatch(setOpen({ ...open, modalSendLeader: true }))
                                }}
                            >
                                Trình lãnh đạo
                            </Button>
                        </div>
                    }
                >
                    <EmployeeProfile employeeId={employeeId}></EmployeeProfile>
                </Modal>
            )}
            <ModalEnd
                employeeId={employeeId}
                setReasonForEnding={setReasonForEnding}
                reasonForEnding={reasonForEnding}
            ></ModalEnd>
            <SendLeader
                employeeId={employeeId}
                reasonForEnding={reasonForEnding}
            ></SendLeader>
            <UpdateHappeningModal employeeId={employeeId}></UpdateHappeningModal>
        </>
    );
};

export default Employee;
