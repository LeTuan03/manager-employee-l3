import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Result, Table } from "antd";
import { getProposal } from "../services/api";
import { format } from "date-fns";

export default function Propose() {
    const [proposeEmp, setProposeEmp] = useState([]);
    const handleGetProposal = async () => {
        const res = await getProposal();
        setProposeEmp(res?.data?.data);
    };
    useEffect(() => {
        handleGetProposal();
    }, []);

    const columns = [
        {
            title: "STT",
            key: "index",
            width: 60,
            render: (text, record, index) => (
                <b className="block text-center">{index + 1}</b>
            ),
        },
        {
            title: "Ngày diễn biến",
            key: "proposalDate",
            dataIndex: "proposalDate",
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Loại",
            key: "type",
            dataIndex: "type",
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
        },
        {
            title: "Nội dung",
            key: "content",
            dataIndex: "content",
            className: "truncate",
        },
        {
            title: "Mô tả chi tiết",
            key: "detailedDescription",
            dataIndex: "detailedDescription",
        },
        {
            title: "Trạng thái",
            key: "proposalStatus",
            dataIndex: "proposalStatus",
            render: (_, status) => {
                let statusProcess;
                switch (status.proposalStatus) {
                    case "2":
                        statusProcess = "Chờ xử lý";
                    default:
                        statusProcess = "Chờ xử lý";
                }
                return <>{statusProcess}</>;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            align: "center",
            render: (_, user) => (
                <div
                    className="cursor-pointer"
                    onClick={() => {
                        console.log(user);
                        // setIsModalOpen(true);
                    }}
                >
                    <EyeOutlined className="text-green-600 text-lg" />
                </div>
            ),
        },
    ];
    return (
        <div>
            {localStorage.getItem("role") === "5" ? (
                <>
                    <Table
                        columns={columns}
                        dataSource={proposeEmp}
                        pagination={{
                            pageSize: 10,
                        }}
                        scroll={{
                            y: 490,
                        }}
                    />
                </>
            ) : (
                <Result
                    icon={<SmileOutlined />}
                    title="Yêu cầu tài khoản manager để truy cập."
                />
            )}
        </div>
    );
}
