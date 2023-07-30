import React, { useEffect, useState } from "react";
import TableComponet from "../../components/Table";
import { Button, Modal } from "antd";
import EmployeeProfile from "../../components/modal-employee-profile/EmployeeProfile";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployee, setOpen } from "../../redux/employee/employeeSlice";

export default function Approved() {
    const [employeeId, setEmployeeId] = useState(null);
    const dispatch = useDispatch();
    const { open } = useSelector((state) => state.employee);
    useEffect(() => {
        dispatch(getAllEmployee("3,7"));
    }, []);
    return (
        <div>
            <TableComponet setEmployeeId={setEmployeeId}></TableComponet>
            {employeeId && (
                <Modal
                    width={1300}
                    className="max-h-[720px] overflow-y-hidden"
                    title="Hồ sơ nhân viên"
                    centered
                    open={open.modalProfile}
                    onOk={() => {
                        dispatch(setOpen({ ...open, modalProfile: false }));
                    }}
                    onCancel={() => {
                        dispatch(setOpen({ ...open, modalProfile: false }));
                    }}
                    footer={
                        <div className="flex justify-center">
                            <Button
                                danger
                                onClick={() => {
                                    dispatch(
                                        setOpen({
                                            ...open,
                                            modalProfile: false,
                                        })
                                    );
                                }}
                            >
                                Hủy
                            </Button>
                        </div>
                    }
                >
                    <EmployeeProfile employeeId={employeeId}></EmployeeProfile>
                </Modal>
            )}
        </div>
    );
}
