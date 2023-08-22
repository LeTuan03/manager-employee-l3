import { Button, Modal, Tabs } from "antd";
import { useState } from "react";
import ProposeTab from "../proposal/RecomenetChildren";
import SendLeaderUpdateHappening from "../modal-send-leader/SendLeaderUpdateHappening";
import PromoteTab from "../process/ProcessChildren";
import {
    ACTIVE_KEY,
    STATUS_EMPLOYEE,
    STATUS_EMPLOYEE_NUMBER,
} from "../../constants/constants";
import IncreaseTab from "../increasesalary/IncreaseSalaryChildren";

const FormUpdateHappening = ({
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
            label: getTitle(data),
            children: getChild(data),
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
                        defaultActiveKey={ACTIVE_KEY}
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
    if (type.salaryIncreaseStatus) {
        return "TĂNG LƯƠNG";
    } else if (type.processStatus) {
        return `THĂNG CHỨC`;
    } else {
        return `ĐỀ XUẤT/THAM MƯU`;
    }
};

const getChild = (data) => {
    if (data.salaryIncreaseStatus) {
        return <IncreaseTab profile={data} />;
    } else if (data.processStatus) {
        return <PromoteTab profile={data} />;
    } else {
        return <ProposeTab profile={data} />;
    }
};
