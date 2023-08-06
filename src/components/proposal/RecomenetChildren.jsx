import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { getEmployeeById } from "../../services/api";
import { format } from "date-fns";

const ProposeTab = ({ profile }) => {
    const [emp, setEmp] = useState({});
    const handleGetDetailPromote = async () => {
        const res2 = await getEmployeeById(profile.employeeId);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailPromote();
    }, [profile]);
    console.log(profile);
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
                    <h3 className="mt-10"> ĐƠN THAM MƯU </h3>
                    <p className="font-bold">Về việc {profile?.content}</p>
                </div>
                <div className="flex justify-center mt-5 p-20">
                    <div className="leading-9">
                        <p className="block">
                            Kính gửi: Giám đốc công ty Ocean Tech
                        </p>
                        <p className="block">
                            Tôi tên là: {emp.name} sinh ngày:{" "}
                            {emp.dateOfBirth &&
                                format(emp.dateOfBirth, "dd-MM-yyyy")}
                        </p>
                        <p className="block">
                            Tôi xin trình bày với nội dung sự việc như sau:{" "}
                            {profile?.detailedDescription}
                        </p>
                        <p className="block">{profile?.detailedDescription}</p>
                        <p className="block">
                            Tôi xin cam đoan những thông tin mà tôi đã nêu trên
                            đây là đúng sự thật và xin chịu trách nhiệm về tính
                            chính xác, trung thực của những thông tin này. Kính
                            mong Ông/Bà xem xét và chấp nhận nguyện vọng trên
                            của tôi.
                        </p>
                        <p className="block">Tôi xin chân thành cảm ơn!</p>
                    </div>
                </div>

                <div className="mt-10">
                    <Row>
                        <Col flex={3} className="text-center"></Col>
                        <Col flex={2} className="text-center">
                            <i>
                                Hà Nội, ngày{" "}
                                {profile.proposalDate &&
                                    format(
                                        new Date(profile.proposalDate),
                                        "dd"
                                    )}{" "}
                                tháng{" "}
                                {profile.proposalDate &&
                                    format(
                                        new Date(profile.proposalDate),
                                        "MM"
                                    )}{" "}
                                năm{" "}
                                {profile.proposalDate &&
                                    format(
                                        new Date(profile.proposalDate),
                                        "yyyy"
                                    )}
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

export default ProposeTab;
