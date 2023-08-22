import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProposeTab from "../proposal/RecomenetChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";
import PromoteTab from "../process/ProcessChildren";
import {
    STATUS_EMPLOYEE,
    STATUS_EMPLOYEE_NUMBER,
    TYPE_UPDATEHAPPENING,
} from "../../constants/constants";
import IncreaseTab from "../increasesalary/IncreaseSalaryChildren";

const FormUpdateHappening = ({
    type,
    isModalOpen,
    setIsModalOpen,
    data,
    handleGetRecomentByEmp,
    handleGetProcessByEmp,
    handleGetSalaryByEmp,
}) => {
    const items = [
        {
            key: "1",
            label: getTitle(type),
            children: getChild(type, data),
        },
    ];
    const [openLeader, setOpenLeader] = useState("");

    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <div className="text-center pb-5">
                        {(data.proposalStatus &&
                            [
                                STATUS_EMPLOYEE_NUMBER.NEW_SAVE,
                                STATUS_EMPLOYEE_NUMBER.ADDITIONAL_REQUIREMENTS,
                                STATUS_EMPLOYEE_NUMBER.REJECT,
                            ].includes(data.proposalStatus)) ||
                        (data.processStatus &&
                            [
                                STATUS_EMPLOYEE.NEW_SAVE,
                                STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS,
                                STATUS_EMPLOYEE.REJECT,
                            ].includes(data.processStatus)) ||
                        (data.salaryIncreaseStatus &&
                            [
                                STATUS_EMPLOYEE_NUMBER.NEW_SAVE,
                                STATUS_EMPLOYEE_NUMBER.ADDITIONAL_REQUIREMENTS,
                                STATUS_EMPLOYEE_NUMBER.REJECT,
                            ].includes(data.salaryIncreaseStatus)) ? (
                            <Button
                                className="min-w-[100px] bg-green-600 hover:!bg-green-500"
                                type="primary"
                                onClick={() => setOpenLeader(true)}
                            >
                                Trình lãnh đạo
                            </Button>
                        ) : null}
                        <Button
                            className="min-w-[100px]"
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
                        style={{ height: 600, overflowY: "scroll" }}
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                    />
                </div>
            </Modal>
            <SendLeaderUpdateHappening
                data={data}
                openLeader={openLeader}
                setOpenLeader={setOpenLeader}
                handleGetRecomentByEmp={handleGetRecomentByEmp}
                handleGetProcessByEmp={handleGetProcessByEmp}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
export default FormUpdateHappening;

const getTitle = (type) => {
    switch (type) {
        case TYPE_UPDATEHAPPENING.RECOMMEND:
            return `ĐỀ XUẤT/THAM MƯU`;
        case TYPE_UPDATEHAPPENING.PROCESS:
            return `THĂNG CHỨC`;
        case TYPE_UPDATEHAPPENING.SALARY:
            return `TĂNG LƯƠNG`;
        default:
            break;
    }
};

const getChild = (type, data) => {
    switch (type) {
        case TYPE_UPDATEHAPPENING.RECOMMEND:
            return <ProposeTab profile={data} />;
        case TYPE_UPDATEHAPPENING.PROCESS:
            return <PromoteTab profile={data} />;
        case TYPE_UPDATEHAPPENING.SALARY:
            return <IncreaseTab profile={data} />;
        default:
            break;
    }
};
