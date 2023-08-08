import React, { useEffect } from "react";
import Table from "../../components/Table";
import ModalInput from "../../components/modal-add-new/ModalInput";
import ModalEnd from "../../components/modal-quit-job/ModalEnd";
import { getAllEmployee } from "../../redux/employee/employeeSlice";
import UpdateHappeningModal from "../../components/update-happening/UpdateHappeningModal";
import ModalProfile from "../../components/modal-employee-profile/ModalProfile";
import { useDispatch } from "react-redux";
import { STATUS_EMPLOYEE } from "../../constants/constants";
import InputSearch from "../../components/InputSearch";
const Employee = () => {
    const {
        BEEN_APPEOVED,
        PROFILE_END_REQUEST,
        ADDITIONAL_REQUIREMENTS_END_PROFILE,
        REJECT_REQUEST_END_PROFILE,
    } = STATUS_EMPLOYEE;
    const dispatch = useDispatch();
    const statusPage = `${BEEN_APPEOVED},${PROFILE_END_REQUEST},${ADDITIONAL_REQUIREMENTS_END_PROFILE},${REJECT_REQUEST_END_PROFILE}`;
    useEffect(() => {
        dispatch(getAllEmployee({ status: statusPage }));
    }, []);
    return (
        <>
            <div className="mb-4 text-right">
                <InputSearch status={statusPage} />
            </div>
            <ModalInput></ModalInput>
            <Table></Table>
            <ModalProfile></ModalProfile>
            <ModalEnd></ModalEnd>
            <UpdateHappeningModal></UpdateHappeningModal>
        </>
    );
};

export default Employee;
