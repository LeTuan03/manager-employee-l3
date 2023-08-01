import { Table } from "antd";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

const TabListCertificate = ({ type }) => {
    const { employee } = useSelector((state) => state.employee);
    const columns = [
        {
            title: "STT",
            key: "index",
            className: "border-table",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên văn bằng",
            dataIndex: "certificateName",
            key: "certificateName",
            className: "border-table",
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
            className: "border-table",
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            className: "border-table",
            render: (dateOfBirth) => <>{format(dateOfBirth, "dd/MM/yyyy")}</>,
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            className: "border-table",
        },
    ];
    return (
        <>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll">
                <div className="min-h-[720px] p-[6%_10%] bg-white">
                    <h1 className="text-lg mb-10">Danh sách văn bằng</h1>
                    <Table
                        bordered
                        dataSource={
                            type
                                ? type?.certificatesDto
                                : employee?.certificatesDto
                        }
                        columns={columns}
                        pagination={false}
                        style={{ border: "#515151 2px double" }}
                    />
                </div>
            </div>
        </>
    );
};

export default TabListCertificate;
