import React, { useEffect } from "react";
import TableComponet from "../../components/Table";
import { useDispatch } from "react-redux";
import { getAllEmployee } from "../../redux/employee/employeeSlice";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { STATUS_EMPLOYEE } from "../../constants/constants";
import InputSearch from "../../components/InputSearch";
export default function Approved() {
    const statusPage = `${STATUS_EMPLOYEE.BEEN_APPEOVED},${STATUS_EMPLOYEE.ACCEPT_REQUEST_END_PROFILE}`;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllEmployee({ status: statusPage }));
    }, []);

    return (
        <div>
            <div className="text-right mb-4">
                <InputSearch status={statusPage} />
            </div>
            <TableComponet></TableComponet>
            <ModalProfile />
        </div>
    );
}
