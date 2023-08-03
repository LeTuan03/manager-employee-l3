import { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { Col, Row } from "antd";
import getDayMonthYear from "../common/getCurrentDay";

const ProcessChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    console.log(empData);
    return (
        <div
            className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll font"
            style={{ fontFamily: "Tinos" }}
        >
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
                        <h3>Về Việc Bổ Nhiệm Cán Bộ, Công Chức</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div>
                            <i className="block">
                                - Căn cứ Nghị định số 138/2020 Nghị định của
                                Chính phủ quy định về tuyển dụng, sử dụng và
                                quản lý công chức.
                            </i>
                            <i className="block">
                                - Căn cứ Luật tổ chức chính quyền địa phương
                                được Quốc hội thông qua ngày 19 tháng 06 năm
                                2015;
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
                <Row className="flex justify-center leading-10">
                    <div>
                        <Col span={24}>
                            <b>Điều 1:</b> Bổ nhiệm Ông/Bà: {empData?.name} giữ
                            chức vụ kể từ ngày{" "}
                            {/* {format(data.promotionDay, "yyyy-MM-dd")}. */}
                        </Col>
                        <Col span={24}>
                            <b>Điều 2:</b> Quyết định này có hiệu lực kể từ ngày{" "}
                            {data.promotionDay &&
                                getDayMonthYear(data.promotionDay).day}{" "}
                            tháng{" "}
                            {data.promotionDay &&
                                getDayMonthYear(data.promotionDay).month}{" "}
                            năm{" "}
                            {data.promotionDay &&
                                getDayMonthYear(data.promotionDay).year}
                        </Col>
                        <Col span={24}>
                            <b>Điều 3:</b>Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {empData?.name} chịu trách
                            nhiệm thi hành quyết định này.
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
                            <b className="block mt-5"> {empData?.name}</b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default ProcessChildren;
