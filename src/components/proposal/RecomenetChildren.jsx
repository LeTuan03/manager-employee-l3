import React from "react";
import { format } from "date-fns";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { TYPE_PROCESS } from "../../constants/constants";

const ProposeTab = ({ profile }) => {
    const { employee } = useSelector((state) => state.employee);
    return (
        <div className="p-[35px] bg-[#e7e7e7] font">
            <div className="bg-white p-[64px]">
                <CommonHeader company="CÔNG TY OCEAN TECH" profile={profile} />
                <div className="text-center">
                    <h3 className="mt-10">
                        {profile?.type === TYPE_PROCESS
                            ? "ĐƠN THAM MƯU"
                            : "ĐƠN ĐỀ XUẤT"}{" "}
                    </h3>
                    <p className="font-bold">Về việc {profile?.note}</p>
                </div>
                <div className="flex justify-center mt-5 p-20">
                    <div className="leading-9">
                        <p>Kính gửi: Giám đốc công ty Ocean Tech</p>
                        <p>
                            Tôi tên là:{" "}
                            <span class="border-b border-dotted border-black inline-block border-t-0 border-l-0 border-r-0 leading-[70%]">
                                {employee.name}
                            </span>{" "}
                            sinh ngày:{" "}
                            <span class="border-b border-dotted border-black inline-block border-t-0 border-l-0 border-r-0 leading-[70%]">
                                {employee.dateOfBirth &&
                                    format(
                                        employee.dateOfBirth,
                                        "dd/MM/yyyy"
                                    )}{" "}
                            </span>{" "}
                        </p>

                        <p>Tôi xin trình bày với nội dung sự việc như sau:</p>
                        <div className="custom-area relative">
                            <TextArea
                                className="!pt-[11px] !pl-0"
                                bordered={false}
                                autoSize={{ minRows: 1 }}
                                value={profile?.detailedDescription}
                            />
                        </div>
                        <p>
                            Tôi xin cam đoan những thông tin mà tôi đã nêu trên
                            đây là đúng sự thật và xin chịu trách nhiệm về tính
                            chính xác, trung thực của những thông tin này. Kính
                            mong Ông/Bà xem xét và chấp nhận nguyện vọng trên
                            của tôi.
                        </p>
                        <p>Tôi xin chân thành cảm ơn!</p>
                    </div>
                </div>
                {Conclusion(profile.proposalDate, employee.name)}
            </div>
        </div>
    );
};

export default ProposeTab;
