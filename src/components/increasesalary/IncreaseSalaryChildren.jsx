import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { Col, Row } from "antd";
import { format } from "date-fns";

const IncreaseTab = ({ profile }) => {
    const [emp, setEmp] = useState({});
    const handleGetDetailSalary = async () => {
        const res2 = await getEmployeeById(profile?.employeeId);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailSalary();
    }, [profile]);
    return (
        <div className="p-[35px] bg-[#e7e7e7] font">
            <div className="bg-white p-[64px]">
                <Row>
                    <Col flex={2} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số: {profile.employeeId}</p>
                    </Col>
                    <Col flex={3} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <h4>Độc lập - Tự do - Hạnh phúc</h4>
                        ----------------------------
                    </Col>
                </Row>
                <div className="text-center">
                    <h3 className="mt-10"> QUYẾT ĐỊNH </h3>
                    <p className="font-bold">
                        Về việc tăng lương cho người lao động
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="leading-9">
                        <i className="block">
                            - Căn cứ vào quy chế lương thưởng và Điều lệ hoạt
                            động của công ty Ocean Tech.
                        </i>
                        <i className="block">
                            - Căn cứ hợp đồng lao động số …/HĐLĐ-...., ngày ….
                            tháng …. năm 20…..
                        </i>
                        <i className="block">
                            - Căn cứ những đóng góp thực tế đối với sự phát
                            triển của Công ty
                        </i>
                    </div>
                </div>
                <div className="text-center m-9">
                    <h3>GIÁM ĐỐC CÔNG TY OCEANTECH</h3>
                    <h3> QUYẾT ĐỊNH</h3>
                </div>
                <div className="flex justify-center leading-10">
                    <div>
                        <div>
                            <b> Điều 1: </b> Kể từ ngày:{" "}
                            {profile?.startDate &&
                                format(profile?.startDate, "dd-MM-yyyy")}{" "}
                            , mức lương của Ông/Bà: {emp.name} sẽ là:{" "}
                            {profile.newSalary} đ.
                        </div>
                        <div>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {emp.name} căn cứ quyết
                            định thi hành.
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <Row>
                        <Col flex={3} className="text-center"></Col>
                        <Col flex={2} className="text-center">
                            <i>
                                Hà Nội, ngày{" "}
                                {profile.startDate &&
                                    format(
                                        new Date(profile.startDate),
                                        "dd"
                                    )}{" "}
                                tháng{" "}
                                {profile.startDate &&
                                    format(
                                        new Date(profile.startDate),
                                        "MM"
                                    )}{" "}
                                năm{" "}
                                {profile.startDate &&
                                    format(new Date(profile.startDate), "yyyy")}
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i>(Ký, ghi rõ họ tên)</i>

                            <b className="block mt-5">{emp.name}</b>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default IncreaseTab;
