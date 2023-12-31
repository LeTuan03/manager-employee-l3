import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, Modal, Table, Tabs } from "antd";
import { getProposal } from "../../services/api";
import { format } from "date-fns";
import ResumeModal from "../resume/ResumeModal";
import { useDispatch } from "react-redux";
import ProposeTab from "../proposal/RecomenetChildren";
import NumberStatus from "../common/NumberStatus";
import STT from "../common/STT";
import TextToTruncate from "../common/TextToTruncate";
import { getEmployee, setIsLoading } from "../../redux/employee/employeeSlice";
import { TABLE_PAGINATION, TYPE_WAITING } from "../../constants/constants";

export default function Propose() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({});
    const [proposeEmp, setProposeEmp] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleGetProposal = async () => {
        try {
            dispatch(setIsLoading(true));
            const res = await getProposal();
            setProposeEmp(res?.data?.data);
            dispatch(setIsLoading(false));
        } catch (error) {
            console.error(error);
            dispatch(setIsLoading(false));
        }
    };
    useEffect(() => {
        handleGetProposal();
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
            title: "Ngày diễn biến",
            key: "proposalDate",
            dataIndex: "proposalDate",
            align: "center",
            width: 150,
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Loại",
            key: "type",
            dataIndex: "type",
            width: 140,
            align: "center",
            render: (type) => {
                return type === 1 ? "Đề xuất" : "Tham mưu";
            },
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
            align: "center",
            width: 150,
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 25)}</p>
            ),
        },
        {
            title: "Nội dung",
            key: "content",
            dataIndex: "content",
            align: "center",
            width: 150,
            render: (content) => (
                <p className="text-left">{TextToTruncate(content || "", 25)}</p>
            ),
        },
        {
            title: "Mô tả chi tiết",
            key: "detailedDescription",
            dataIndex: "detailedDescription",
            align: "center",
            width: 250,
            render: (detailedDescription) => (
                <p className="text-left">
                    {TextToTruncate(detailedDescription || "", 25)}
                </p>
            ),
        },
        {
            title: "Trạng thái",
            key: "proposalStatus",
            dataIndex: "proposalStatus",
            align: "center",
            width: 180,
            render: (_, status) => NumberStatus(status.proposalStatus),
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            width: 130,
            render: (_, user) => (
                <div
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
                        dataSource={STT(proposeEmp)}
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
                            setIsOpen={setIsModalOpen}
                            profile={profile}
                            handleGetProposal={handleGetProposal}
                            type={TYPE_WAITING.PROPOSE}
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
                    items={[
                        {
                            key: "1",
                            label: `ĐỀ XUẤT/THAM MƯU`,
                            children: <ProposeTab profile={profile} />,
                        },
                    ]}
                />
            </Modal>
        </div>
    );
}
