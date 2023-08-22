import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, Modal, Table, Tabs } from "antd";
import { getProcess } from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useDispatch } from "react-redux";
import PromoteTab from "../process/ProcessChildren";
import StringStatus from "../common/StringStatus";
import STT from "../common/STT";
import ProcesPosition from "../common/ProcessPosition";
import TextToTruncate from "../common/TextToTruncate";
import { getEmployee, setIsLoading } from "../../redux/employee/employeeSlice";
import {
    ACTIVE_KEY,
    TABLE_PAGINATION,
    TYPE_WAITING,
} from "../../constants/constants";

export default function Promote() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({});
    const [processEmp, setProcessEmp] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGetProcess = async () => {
        dispatch(setIsLoading(true));
        const res = await getProcess();
        setProcessEmp(res?.data?.data);
        dispatch(setIsLoading(false));
    };
    useEffect(() => {
        handleGetProcess();
    }, []);

    const columns = [
        {
            title: "STT",
            key: "index",
            width: 60,
            align: "center",
            render: (_, item) => <>{item?.index + 1}</>,
        },
        {
            title: "Ngày thăng chức",
            key: "promotionDay",
            dataIndex: "promotionDay",
            align: "center",
            width: 150,
            render: (date, index) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            key: "times",
            dataIndex: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Chức vụ cũ",
            key: "currentPosition",
            dataIndex: "currentPosition",
            align: "center",
            width: 160,
            render: (currentPosition) => ProcesPosition(currentPosition),
        },
        {
            title: "Chức vụ hiện tại",
            key: "newPosition",
            dataIndex: "newPosition",
            align: "center",
            width: 160,
            render: (newPosition) => ProcesPosition(newPosition),
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            align: "center",
            width: 300,
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 40)}</p>
            ),
        },
        {
            title: "Trạng thái",
            key: "processStatus",
            dataIndex: "processStatus",
            align: "center",
            width: 180,
            render: (_, status) => StringStatus(status.processStatus),
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            width: 130,
            render: (_, user, index) => (
                <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => {
                        setProfile(user);
                        dispatch(getEmployee(user.employeeId));
                        setIsModalOpen(true);
                    }}
                >
                    <EyeOutlined className="text-green-600 text-lg" />
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="main-table">
                <ConfigProvider
                    renderEmpty={() => (
                        <>
                            <Empty description={false} />
                        </>
                    )}
                >
                    <Table
                        bordered
                        columns={columns}
                        dataSource={STT(processEmp)}
                        pagination={TABLE_PAGINATION}
                        scroll={{
                            y: 490,
                        }}
                    />
                </ConfigProvider>
            </div>
            <Modal
                zIndex={1}
                title="Biểu mẫu"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                width={1300}
                centered
                footer={
                    <div className="text-center flex justify-center pb-5">
                        <ResumeModal
                            handleGetProcess={handleGetProcess}
                            setIsOpen={setIsModalOpen}
                            profile={profile}
                            type={TYPE_WAITING.PROMOTE}
                        />
                        <Button
                            className="ml-2"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Tabs
                    style={{ height: 600, overflowY: "scroll" }}
                    tabPosition="left"
                    defaultActiveKey={ACTIVE_KEY}
                    items={[
                        {
                            key: "1",
                            label: `THĂNG CHỨC`,
                            children: <PromoteTab profile={profile} />,
                        },
                    ]}
                />
            </Modal>
        </div>
    );
}
