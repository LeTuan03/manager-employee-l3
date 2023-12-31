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
            width: 50,
            render: (text, record, index) => <>{index + 1}</>,
        },
        {
            title: "Tên văn bằng",
            dataIndex: "certificateName",
            key: "certificateName",
            className: "border-table",
            align: "center",
            render: (certificateName) => (
                <div className="text-left break-all max-w-[150px]">
                    {certificateName}
                </div>
            ),
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
            align: "center",
            className: "border-table",
            render: (content) => (
                <div className="text-left max-w-[200px] break-all">
                    {content}
                </div>
            ),
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            className: "border-table",
            align: "center",
            render: (dateOfBirth) => (
                <div className="break-all">
                    {format(dateOfBirth, "dd/MM/yyyy")}
                </div>
            ),
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
            align: "center",
            className: "border-table",
            render: (field) => (
                <div className="text-left max-w-[100px] break-all">{field}</div>
            ),
        },
    ];
    return (
        <>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll font">
                <div className=" bg-white flex flex-row p-[6%_10%] ">
                    <div className="w-full">
                        <h4 className="mb-5">DANH SÁCH VĂN BẰNG</h4>
                        <ConfigProvider renderEmpty={() => <></>}>
                            <Table
                                className="w-full"
                                bordered
                                dataSource={employee?.certificatesDto}
                                columns={columns}
                                pagination={false}
                                style={{ border: "#515151 1px double" }}
                            />
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabListCertificate;
