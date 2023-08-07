import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/api";
import { format } from "date-fns";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";

const PromoteTab = ({ profile }) => {
    const [emp, setEmp] = useState({});
    const handleGetDetailPromote = async () => {
        const res2 = await getEmployeeById(profile.employeeId);
        setEmp(res2?.data?.data);
    };
    useEffect(() => {
        handleGetDetailPromote();
    }, [profile]);
    return (
        <div className="p-[35px] bg-[#e7e7e7] font" s>
            <div className="bg-white p-[64px]">
                <CommonHeader company="CÔNG TY OCEAN TECH" profile={profile} />
                <div className="text-center">
                    <h3 className="mt-10"> QUYẾT ĐỊNH </h3>
                    <p className="font-bold">
                        Về Việc Bổ Nhiệm Cán Bộ, Công Chức
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="leading-9">
                        <i className="block">
                            - Căn cứ Nghị định số 138/2020 Nghị định của Chính
                            phủ quy định về tuyển dụng, sử dụng và quản lý công
                            chức.
                        </i>
                        <i className="block">
                            - Căn cứ Luật tổ chức chính quyền địa phương được
                            Quốc hội thông qua ngày 19 tháng 06 năm 2015;
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
                            <b> Điều 1: </b> Bổ nhiệm Ông/Bà: {emp.name} giữ
                            chức vụ kể từ ngày{" "}
                            {profile.promotionDay &&
                                format(
                                    new Date(profile.promotionDay),
                                    "dd-MM-yyyy"
                                )}
                            .
                        </div>
                        <div>
                            <b>Điều 2:</b> Quyết định này có hiệu lực kể từ ngày
                            ký.
                        </div>
                        <div>
                            <b>Điều 3:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {emp.name} chịu trách nhiệm
                            thi hành quyết định này.
                        </div>
                    </div>
                </div>
                {Conclusion(profile.promotionDay, emp.name)}
            </div>
        </div>
    );
};

export default PromoteTab;
