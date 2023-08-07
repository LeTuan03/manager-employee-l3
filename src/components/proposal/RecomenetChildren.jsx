import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { format } from "date-fns";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";

const ProposeTab = ({ profile }) => {
    const [emp, setEmp] = useState({});
    const handleGetDetailPromote = async () => {
        const res2 = await getEmployeeById(profile.employeeId);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailPromote();
    }, [profile]);
    return (
        <div className="p-[35px] bg-[#e7e7e7] font">
            <div className="bg-white p-[64px]">
                <CommonHeader company="CÔNG TY OCEAN TECH" profile={profile} />
                <div className="text-center">
                    <h3 className="mt-10"> ĐƠN THAM MƯU </h3>
                    <p className="font-bold">Về việc {profile?.content}</p>
                </div>
                <div className="flex justify-center mt-5 p-20">
                    <div className="leading-9">
                        <p>Kính gửi: Giám đốc công ty Ocean Tech</p>
                        <p>Tôi tên là: {emp.name} </p>
                        <p>
                            Sinh ngày:{" "}
                            {emp.dateOfBirth &&
                                format(emp.dateOfBirth, "dd-MM-yyyy")}
                        </p>
                        <p>Tôi xin trình bày với nội dung sự việc như sau:</p>
                        <p>{profile?.detailedDescription}</p>
                        <p>
                            Tôi xin cam đoan những thông tin mà tôi đã nêu trên
                            đây là đúng sự thật và xin chịu trách nhiệm về tính
                            chính xác, trung thực của những thông tin này.
                        </p>
                        <p>
                            Kính mong Ông/Bà xem xét và chấp nhận nguyện vọng
                            trên của tôi.
                        </p>
                        <p>Tôi xin chân thành cảm ơn!</p>
                    </div>
                </div>
                {Conclusion(profile.proposalDate, emp.name)}
            </div>
        </div>
    );
};

export default ProposeTab;
