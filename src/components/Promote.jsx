import React, { useEffect, useState } from "react";
import { EyeOutlined, SmileOutlined } from "@ant-design/icons";
import { Result, Table } from "antd";
import { getProcess } from "../services/api";
import { format } from "date-fns";

export default function Promote() {
    const [processEmp, setProcessEmp] = useState([]);
    const handleGetProcess = async () => {
        const res = await getProcess();
        setProcessEmp(res?.data?.data);
    };
    useEffect(() => {
        handleGetProcess();
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
            title: "Ngày thăng chức",
            key: "promotionDay",
            dataIndex: "promotionDay",
            render: (date) => format(date, "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            key: "times",
            dataIndex: "times",
        },
        {
            title: "Chức vụ cũ",
            key: "currentPosition",
            dataIndex: "currentPosition",
        },
        {
            title: "Chức vụ hiện tại",
            key: "newPosition",
            dataIndex: "newPosition",
        },
        {
            title: "Ghi chú",
            key: "note",
            dataIndex: "note",
        },
        {
            title: "Trạng thái",
            key: "processStatus",
            dataIndex: "processStatus",
            render: (_, status) => {
                let statusProcess;
                switch (status.processStatus) {
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
                        dataSource={processEmp}
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
