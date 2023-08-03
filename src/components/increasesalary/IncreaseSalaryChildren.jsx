import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { Col, Row } from "antd";
import getDayMonthYear from "../common/getCurrentDay";

const IncreaseSalaryChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    console.log(data);
    return (
        <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll font">
            <div
                className="bg-white p-10 font"
                style={{
                    fontFamily: "Tinos",
                }}
            >
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
                        <h3>Về việc tăng lương cho người lao động</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div>
                            <i className="block">
                                - Căn cứ vào quy chế lương thưởng và Điều lệ
                                hoạt động của công ty Ocean Tech.
                            </i>
                            <i className="block">
                                - Căn cứ hợp đồng lao động số …/HĐLĐ-...., ngày
                                …. tháng …. năm 20…..
                            </i>
                            <i className="block">
                                - Căn cứ những đóng góp thực tế đối với sự phát
                                triển của Công ty
                            </i>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center m-10">
                        <h3>GIÁM ĐỐC CÔNG TY OCEANTECH</h3>
                        <h3>QUYẾT ĐỊNH</h3>
                    </Col>
                </Row>
                <Row className="flex justify-center">
                    <div>
                        <Col span={24}>
                            <b>Điều 1:</b> Kể từ ngày:{" "}
                            {data.startDate &&
                                getDayMonthYear(data.startDate).day}{" "}
                            tháng{" "}
                            {data.startDate &&
                                getDayMonthYear(data.startDate).month}{" "}
                            năm{" "}
                            {data.startDate &&
                                getDayMonthYear(data.startDate).year}{" "}
                            , mức lương của Ông/Bà: {empData?.name} sẽ là:
                            {"  "} {data?.newSalary} đồng
                        </Col>
                        <Col span={24}>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: wqeqew căn cứ quyết định
                            thi hành.
                        </Col>
                    </div>
                </Row>
                <Row className="mt-10">
                    <Col span={12}></Col>
                    <Col span={12} className="text-center">
                        <div>
                            <i className="block">
                                Hà Nội, ngày {getDayMonthYear(new Date()).day}{" "}
                                tháng {getDayMonthYear(new Date()).month} năm{" "}
                                {getDayMonthYear(new Date()).year}
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i className="block">(Ký, ghi rõ họ tên)</i>
                            <b className="block mt-5">{empData?.name}</b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default IncreaseSalaryChildren;
