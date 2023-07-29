import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import { Button, Modal } from "antd";
import EmployeeProfile from "../../components/modal-employee-profile/EmployeeProfile";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";
import SaveResume from '../../components/resume/SaveResume'
const PageEnd = () => {
    const [employeeId, setEmployeeId] = useState(null);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const dispatch = useDispatch()
    const { open } = useSelector((state) => state.employee)
    useEffect(() => {
        dispatch(getAllEmployee("7,0"))
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
                            <Button
                                type="primary"
                                onClick={() => setIsResumeOpen(true)}
                            >
                                Nộp lưu hồ sơ
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
                    <SaveResume
                        employeeId={employeeId}
                        isResumeOpen={isResumeOpen}
                        setIsResumeOpen={setIsResumeOpen}
                    ></SaveResume>
                </Modal>
            )}
        </>
    );
};

export default PageEnd;