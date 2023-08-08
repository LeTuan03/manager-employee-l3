import React from "react";
import { ConfigProvider, Table } from "antd";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const TabListCertificate = () => {
    const { employee } = useSelector((state) => state.employee);
    const columns = [
        {
            title: "STT",
            key: "index",
            className: "border-table",
            align: "center",
            render: (text, record, index) => <>{index + 1}</>,
        },
        {
            title: "Tên văn bằng",
            dataIndex: "certificateName",
            key: "certificateName",
            className: "border-table",
            align: "center",
            render: (certificateName) => (
                <div className="text-left">{certificateName}</div>
            ),
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
            align: "center",
            className: "border-table",
            render: (content) => <div className="text-left">{content}</div>,
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            className: "border-table",
            align: "center",
            render: (dateOfBirth) => <>{format(dateOfBirth, "dd/MM/yyyy")}</>,
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
            className: "border-table",
            render: (field) => <div className="text-left">{field}</div>,
        },
    ];
    return (
        <>
            <div className="bg-[#e7e7e7] p-14 font-table max-h-[900px] font">
                <div className="p-[6%_10%] bg-white">
                    <h1 className="text-lg mb-10">Danh sách văn bằng</h1>
                    <ConfigProvider renderEmpty={() => <></>}>
                        <Table
                            scroll={{ x: "scroll" }}
                            bordered
                            dataSource={employee?.certificatesDto}
                            columns={columns}
                            pagination={false}
                            style={{ border: "#515151 1px double" }}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </>
    );
};

export default TabListCertificate;
