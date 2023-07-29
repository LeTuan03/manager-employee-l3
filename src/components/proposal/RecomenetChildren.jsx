import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { Col, Row } from "antd";

const RecomenetChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    return (
        <div className="bg-slate-300 p-10">
            <div className="bg-white p-10">
                <Row>
                    <Col span={12} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số:</p>
                    </Col>
                    <Col span={12} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <b>Độc lập - Tự do - Hạnh phúc</b>
                        <p>--------------------</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center mt-10">
                        <h2>QUYẾT ĐỊNH</h2>
                        <h3>Về Việc {data?.note}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div className="w-[60%]">
                            <p className="block">
                                Kính gửi: Giám đốc công ty Ocean Tech
                            </p>
                            <p className="block">
                                Tôi tên là: {empData?.name} sinh ngày:{" "}
                                {/* {format(empData.dateOfBirth, "yyyy-MM-dd")} */}
                            </p>
                            <p className="block">
                                Tôi xin trình bày với nội dung sự việc như sau:
                            </p>
                            <p
                                className="block leading-[100%]"
                                style={{ borderBottom: "1px dotted #000" }}
                            >
                                {data.detailedDescription}
                            </p>
                            <p className="block">
                                Tôi xin cam đoan những thông tin mà tôi đã nêu
                                trên đây là đúng sự thật và xin chịu trách nhiệm
                                về tính chính xác, trung thực của những thông
                                tin này. Kính mong Ông/Bà xem xét và chấp nhận
                                nguyện vọng trên của tôi.
                            </p>
                            <p className="block">Tôi xin chân thành cảm ơn!</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-10">
                    <Col span={12}></Col>
                    <Col span={12} className="text-center">
                        <div>
                            <i className="block">
                                Hà Nội, ngày ... tháng ... năm 2023
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i className="block">(Ký, ghi rõ họ tên)</i>
                            <b className="block mt-5"> {empData?.name} </b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default RecomenetChildren;
