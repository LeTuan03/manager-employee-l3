import React from "react";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";
import formatDate from "../common/FormatDate";
import ProcesPosition from "../common/ProcessPosition";
import { useSelector } from "react-redux";

const PromoteTab = ({ profile }) => {
    const { employee } = useSelector((state) => state.employee);
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
                    <div className="px-10">
                        <div>
                            <b> Điều 1: </b> Bổ nhiệm Ông/Bà: {employee.name}{" "}
                            giữ chức vụ {ProcesPosition(profile?.newPosition)}{" "}
                            kể từ {formatDate(profile?.promotionDay)}.
                        </div>
                        <div>
                            <b>Điều 2:</b> Quyết định này có hiệu lực kể từ ngày
                            ký.
                        </div>
                        <div>
                            <b>Điều 3:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {employee.name} chịu trách
                            nhiệm thi hành quyết định này.
                        </div>
                    </div>
                </div>
                {Conclusion(profile.promotionDay, employee.name)}
            </div>
        </div>
    );
};

export default PromoteTab;
