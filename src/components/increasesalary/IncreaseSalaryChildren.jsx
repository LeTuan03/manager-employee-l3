import React from "react";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";
import formatDate from "../common/FormatDate";
import { useSelector } from "react-redux";

const IncreaseTab = ({ profile }) => {
    const { employee } = useSelector((state) => state.employee);
    return (
        <div className="p-[35px] bg-[#e7e7e7] font">
            <div className="bg-white p-[64px]">
                <CommonHeader company="CÔNG TY OCEAN TECH" profile={profile} />
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
                <div className="flex justify-center leading-10 mb-8">
                    <div>
                        <div>
                            <b> Điều 1: </b> Kể từ{" "}
                            {formatDate(profile?.startDate)} , mức lương của
                            Ông/Bà: {employee.name} sẽ là: {profile.newSalary}{" "}
                            đ.
                        </div>
                        <div>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {employee.name} căn cứ
                            quyết định thi hành.
                        </div>
                    </div>
                </div>
                {Conclusion(profile.startDate, employee.name)}
            </div>
        </div>
    );
};
export default IncreaseTab;
