import React from "react";
import { format } from "date-fns";
import { Table, Tabs } from "antd";
import { Col, Row } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Image } from "antd";
import {
    MailOutlined,
    WifiOutlined,
    WhatsAppOutlined,
    UserOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
export default function EmployeeProfile(props) {
    const { profile, certificate, resume } = props;
    const splitTextIntoParagraphs = (text, maxLength) => {
        const paragraphs = [];
        while (text?.length > 0) {
            const paragraph = text.substring(0, maxLength);
            paragraphs.push(paragraph);
            text = text.substring(maxLength);
        }
        return paragraphs;
    };
    const skillParagraphs = splitTextIntoParagraphs(profile?.skill, 50);
    const activityParagraphs = splitTextIntoParagraphs(profile?.activity, 50);

    const columns = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên văn bằng",
            dataIndex: "certificateName",
            key: "certificateName",
        },
        {
            title: "Nội dung văn bằng",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Ngày cấp",
            dataIndex: "issueDate",
            key: "issueDate",
            render: (dateOfBirth) => <>{format(dateOfBirth, "dd/MM/yyyy")}</>,
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field",
        },
    ];
    const columnFamily = [
        {
            title: "STT",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender) =>
                gender === 2 ? "Nữ" : gender === 1 ? "Nam" : "Khác",
        },
        {
            title: "Quan hệ",
            dataIndex: "relationShip",
            key: "relationShip",
            render: (relationShip) =>
                relationShip == 2
                    ? "Mẹ"
                    : relationShip === 1
                    ? "Bố"
                    : "Người trong gia đình",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Số CCCD/CMT",
            dataIndex: "citizenIdentificationNumber",
            key: "citizenIdentificationNumber",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
    ];
    const dataRows = [
        {
            label: "1. Họ và tên: ",
            span: 16,
            value: resume.name,
        },
        {
            label: "2. Nam/Nữ: ",
            span: 8,
            value:
                resume.gender === 0
                    ? "Nam"
                    : resume.gender === 1
                    ? "Nữ"
                    : "Khác",
        },
        {
            label: "3. Ngày sinh: ",
            span: 12,
            value: format(new Date(), "dd-MM-yyy"),
        },
        {
            label: "4. Nơi sinh: ",
            span: 12,
            value: resume.address,
        },
        {
            label: "5. Nguyên quán: ",
            span: 24,
            value: resume.address,
        },
        {
            label: "6. Số CCCD: ",
            span: 8,
            value: resume.citizenIdentificationNumber,
        },
        {
            label: "7. Ngày cấp: ",
            span: 8,
            value: resume.dateOfIssuanceCard,
        },
        {
            label: "8. Nơi cấp: ",
            span: 8,
            value: resume.placeOfIssueCard,
        },
        {
            label: "9. Số điện thoại: ",
            span: 24,
            value: resume.phone,
        },
        {
            label: "10. Email: ",
            span: 24,
            value: resume.email,
        },
        {
            label: "11. Dân tộc: ",
            span: 12,
            value: resume.ethnic,
        },
        {
            label: "12. Tôn giáo: ",
            span: 12,
            value: resume.religion,
        },
    ];
    const DataRow = ({ label, value, span }) => (
        <Col span={span} className="relative pr-4 mb-3">
            <span className="py-2 bg-white">{label}</span>
            {value}
            <div style={{ border: "thin dotted #000" }}></div>
        </Col>
    );
    return (
        <div>
            <Tabs
                tabPosition={"left"}
                defaultActiveKey="1"
                style={{ height: 600, overflowY: "scroll" }}
            >
                <TabPane tab="HỒ SƠ" key="1">
                    <div className="flex flex-row">
                        <div className="basis-1/4 p-10">
                            <Image
                                width={200}
                                height={200}
                                className="rounded-full overflow-hidden"
                                src="error"
                                fallback={profile.image}
                            />
                            <div className="email mt-10">
                                <MailOutlined className="mr-3" />
                                {profile.email}
                            </div>
                            <div className="phone">
                                <WhatsAppOutlined className="mr-3" />
                                {profile.phone}
                            </div>
                            <div className="address">
                                <WifiOutlined className="mr-3" />
                                {profile.address}
                            </div>
                            <div className="genle">
                                <UserOutlined className="mr-3" />
                                {profile.gender === 1
                                    ? "Nam"
                                    : profile.gender === 2
                                    ? "Nữ"
                                    : "Khác"}
                            </div>
                            <div className="birth"></div>
                            <h2 className="my-5">Kĩ năng</h2>
                            {skillParagraphs?.map((paragraph, index) => (
                                <div key={index} className="relative">
                                    <p>{paragraph}</p>
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </div>
                            ))}
                            <h2 className="my-5">Hoạt động</h2>
                            {activityParagraphs?.map((paragraph, index) => (
                                <div key={index} className="relative">
                                    <p>{paragraph}</p>
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="basis-2/4 pl-10">
                            <div className="border-l-2">
                                <h1>{profile.name}</h1>
                                <div className="text-lg">
                                    {profile.team === 1
                                        ? "Back-end"
                                        : "Front-end"}
                                </div>
                            </div>
                            <div className="border-l-2 mt-8">
                                <div>
                                    <div className="text-lg mb-3">HỌC VẤN</div>
                                    <div className="relative">
                                        <span className="absolute top-[-4px] left-[4px] text-3xl z-50">
                                            ❝
                                        </span>
                                        <TextArea
                                            placeholder="Học vấn của bạn!"
                                            className="bg-slate-200 pointer-events-none pl-7"
                                        />
                                        <span className="absolute right-[8px] bottom-[-10px] text-3xl z-50">
                                            ❞
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l-2">
                                <div className="text-lg mt-10">
                                    KINH NGHIỆM LÀM VIỆC
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="SƠ YẾU LÍ LỊCH" key="2" className="ml-14">
                    <div className="flex">
                        <Image
                            width={200}
                            height={200}
                            className="rounded-full overflow-hidden"
                            src={profile.image}
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
                        <h4 className="mt-10 mb-5">I. THÔNG TIN BẢN THÂN</h4>
                        {/* <div className="ml-3 pr-8">
                            <Row>
                                <Col span={16} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        1. Họ và tên :{" "}
                                    </span>
                                    {resume.name}
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </Col>
                                <Col span={8} className="relative  pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        2. Nam/Nữ :{" "}
                                    </span>
                                    {resume.gender === 0
                                        ? "Nam"
                                        : resume.gender === 1
                                        ? "Nữ"
                                        : " Khác"}
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        3. Ngày sinh :{" "}
                                    </span>
                                    {'format(resume.dateOfBirth, "dd-MM-yyy")'}
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </Col>
                                <Col span={12} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        4. Nơi sinh :{" "}
                                    </span>
                                    {resume.address}
                                    <div
                                        style={{
                                            border: "thin dotted #000",
                                        }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        5. Nguyên quán :{" "}
                                    </span>
                                    {resume.address}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        6. Số CCCD :{" "}
                                    </span>
                                    {resume.citizenIdentificationNumber}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                                <Col span={8} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        7. Ngày cấp :{" "}
                                    </span>
                                    {resume.dateOfIssuanceCard}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                                <Col span={8} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        8. Nơi cấp :{" "}
                                    </span>
                                    {resume.placeOfIssueCard}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        9. Số điện thoại:{" "}
                                    </span>
                                    {resume.phone}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        10. Email :
                                    </span>
                                    {resume.email}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        11. Dân tộc :{" "}
                                    </span>
                                    {resume.ethnic}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                                <Col span={12} className="relative pr-4 mb-3">
                                    <span className="py-2 bg-white">
                                        12. Tôn giáo :{" "}
                                    </span>
                                    {resume.religion}
                                    <div
                                        style={{ border: "thin dotted #000" }}
                                    ></div>
                                </Col>
                            </Row>
                        </div> */}
                        <Row>
                            {dataRows.map((row, index) => (
                                <DataRow
                                    key={index}
                                    label={row.label}
                                    value={row.value}
                                    span={row.span}
                                />
                            ))}
                        </Row>
                        <h4 className="mt-10 mb-5">II. QUAN HỆ GIA ĐÌNH</h4>
                        <i className="block mb-4">
                            (Ghi rõ họ tên, ngày sinh, quan hệ, số điện thoại,
                            số căn cước công dân (chứng minh thư nhân dân) của
                            bố mẹ đẻ, anh chị em ruột, vợ (hoặc chồng), con)
                        </i>
                        <Table
                            bordered
                            dataSource={resume.employeeFamilyDtos}
                            columns={columnFamily}
                            pagination={false}
                            style={{ border: "1px solid #000" }}
                        />
                        <h4 className="text-center my-5">LỜI CAM ĐOAN</h4>
                        <p className="text-center">
                            Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng
                            sự thật, nếu có điều gì không đúng tôi chịu trách
                            nhiệm trước pháp luật về lời khai của mình.
                        </p>
                        <div className="flex flex-row-reverse m-5">
                            <div className="text-center pr-10">
                                <i>Hà Nội, ngày 19 tháng 7 năm 2023</i>
                                <h3>NGƯỜI LÀM ĐƠN</h3>
                                <i className="block m-8 mt-3">
                                    (Ký, ghi rõ họ tên)
                                </i>
                                <h4 className="name-employee mb-10 text-2xl">
                                    {resume.name}
                                </h4>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="DANH SÁCH VĂN BẰNG" key="3">
                    <h1 className="text-lg mb-10">Danh sách văn bằng</h1>
                    <Table
                        bordered
                        dataSource={certificate}
                        columns={columns}
                        pagination={false}
                        style={{ border: "1px solid #000", minHeight: 500 }}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
}
