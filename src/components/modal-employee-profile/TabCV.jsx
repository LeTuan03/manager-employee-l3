import { Avatar, Col, ConfigProvider, Row, Table } from "antd";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import Conclusion from "../common/Conclusion";
import TextToTruncate from "../common/TextToTruncate";
import Gender from "../common/Gender";
import RelationShip from "../common/RelationShip";

const TabCV = () => {
    const { employee } = useSelector((state) => state.employee);
    const columnFamily = [
        {
            title: "STT",
            key: "index",
            className: "border-table",
            align: "center",
            render: (text, record, index) => <>{index + 1}</>,
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
            align: "center",
            className: "border-table max-w-[90px]",
            render: (name) => <div className="max-w-[90px]">{name}</div>,
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            className: "border-table max-w-[60px]",
            align: "center",
            render: (dateOfBirth) => (
                <div className=" break-all">
                    {dateOfBirth && format(new Date(dateOfBirth), "dd/MM/yyyy")}
                </div>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            className: "border-table max-w-[50px]",
            align: "center",
            render: (gender) => Gender(gender),
        },
        {
            title: "Quan hệ",
            dataIndex: "relationShip",
            key: "relationShip",
            className: "border-table max-w-[60px]",
            align: "center",
            render: (relationShip) => RelationShip(relationShip),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            className: "border-table max-w-[70px]",
            align: "center",
            render: (phoneNumber) => (
                <div className="break-all">{phoneNumber}</div>
            ),
        },
        {
            title: "Số CCCD",
            dataIndex: "citizenIdentificationNumber",
            key: "citizenIdentificationNumber",
            align: "center",

            className: "border-table max-w-[60px]",
            render: (citizenIdentificationNumber) => (
                <p className=" break-all">{citizenIdentificationNumber}</p>
            ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
            className: "border-table max-w-[130px]",
            render: (address) => (
                <div className="text-left p-2 break-all">{address}</div>
            ),
        },
    ];
    const dataRows = [
        {
            id: 1,
            label: "1. Họ và tên: ",
            span: 16,
            value: employee.name,
        },
        {
            id: 2,
            label: "2. Nam/Nữ: ",
            span: 8,
            value: Gender(employee.gender),
        },
        {
            id: 3,
            label: "3. Ngày sinh: ",
            span: 12,
            value:
                employee.dateOfBirth &&
                format(new Date(employee.dateOfBirth), "dd/MM/yyyy"),
        },
        {
            id: 4,
            label: "4. Nơi sinh: ",
            span: 12,
            value: employee.address && TextToTruncate(employee.address, 30),
        },
        {
            id: 5,
            label: "5. Nguyên quán: ",
            span: 24,
            value: employee.address && TextToTruncate(employee.address, 70),
        },
        {
            id: 6,
            label: "6. Số CCCD: ",
            span: 12,
            value: employee.citizenIdentificationNumber,
        },
        {
            id: 7,
            label: "7. Ngày cấp: ",
            span: 12,
            value:
                employee.dateOfIssuanceCard &&
                format(new Date(employee.dateOfIssuanceCard), "dd/MM/yyyy"),
        },
        {
            id: 8,
            label: "8. Nơi cấp: ",
            span: 24,
            value:
                employee.placeOfIssueCard &&
                TextToTruncate(employee.placeOfIssueCard, 80),
        },
        {
            id: 9,
            label: "9. Số điện thoại: ",
            span: 24,
            value: employee.phone,
        },
        {
            id: 10,
            label: "10. Email: ",
            span: 24,
            value: employee.email,
        },
        {
            id: 11,
            label: "11. Dân tộc: ",
            span: 12,
            value: employee.ethnic,
        },
        {
            id: 12,
            label: "12. Tôn giáo: ",
            span: 12,
            value: employee.religion,
        },
    ];
    return (
        <>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll font">
                <div className="min-h-[720px] p-[6%_10%] bg-white">
                    <div className="flex mb-10">
                        <Avatar
                            className="cursor-pointer"
                            src={employee?.image}
                            size={200}
                        />
                        <div className="max-w-3xl mx-auto ">
                            <h1 className="text-center text-2xl font-bold">
                                CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                            </h1>
                            <h2 className="text-center text-lg font-bold mb-6 underline underline-offset-8">
                                Độc lập - Tự do - Hạnh Phúc
                            </h2>
                            <h1 className="font-bold mb-4 text-center">
                                SƠ YẾU LÝ LỊCH
                            </h1>
                            <h3 className="text-lg font-bold mb-4 text-center">
                                TỰ THUẬT
                            </h3>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-[11px]">I. THÔNG TIN BẢN THÂN</h4>
                        <Row>
                            {dataRows.map((row) => (
                                <DataRow
                                    key={row.id}
                                    label={row.label}
                                    value={row.value}
                                    span={row.span}
                                />
                            ))}
                        </Row>
                        <h4 className="mt-5 mb-[11px]">II. QUAN HỆ GIA ĐÌNH</h4>
                        <i className="block mb-[14px] !text-[14px]">
                            (Ghi rõ họ tên, ngày sinh, quan hệ, số điện thoại,
                            số căn cước công dân (chứng minh thư nhân dân) của
                            bố mẹ đẻ, anh chị em ruột, vợ (hoặc chồng), con)
                        </i>
                        <div className="table-cv">
                            <ConfigProvider renderEmpty={() => <></>}>
                                <Table
                                    bordered
                                    dataSource={employee.employeeFamilyDtos}
                                    columns={columnFamily}
                                    pagination={false}
                                    style={{ border: "1px solid #000" }}
                                />
                            </ConfigProvider>
                        </div>
                        <h4 className="text-center mt-4">LỜI CAM ĐOAN</h4>
                        <p className="text-left leading-6 mb-8">
                            Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng
                            sự thật, nếu có điều gì không đúng tôi chịu trách
                            nhiệm trước pháp luật về lời khai của mình.
                        </p>
                        {Conclusion(
                            employee?.submitDay
                                ? employee?.submitDay
                                : new Date(),
                            employee.name
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabCV;

const DataRow = ({ label, value, span }) => (
    <Col span={span} className=" pr-4 mb-[4px] flex">
        <span className="bg-white inline-flex items-center h-[25px]">
            {label}
        </span>
        <div className="flex flex-shrink flex-grow h-[32px] pl-1">
            <span className="relative z-10 pl-3 h-fit inline-block w-full ">
                {value}
                <div className="absolute w-full left-0 h-full top-[82%] dotted-border" />
            </span>
        </div>
    </Col>
);
