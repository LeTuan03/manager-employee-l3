import React from "react";
import { Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/constants";
import Conclusion from "../common/Conclusion";
import CommonHeader from "../common/CommonHeader";

const QuitJob = ({ reasonForEnding, setReasonForEnding }) => {
    const { employee } = useSelector((state) => state.employee);
    const { role } = useSelector((state) => state.account);
    return (
        <div
            className="font"
            style={{
                fontFamily: "Tinos",
            }}
        >
            <div className="bg-[#e7e7e7] p-14 max-h-[520px] overflow-y-scroll">
                <div className=" bg-white py-10 pb-20">
                    <CommonHeader
                        company="CÔNG TY OCEAN TECH"
                        profile={employee}
                    />
                    <Row>
                        <Col span={24} className="text-center mt-10">
                            <h2>ĐƠN XIN NGHỈ VIỆC</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} className="flex justify-center mt-10">
                            <div className="w-[70%] leading-9">
                                <div>Kính gửi: Giám đốc công ty Ocean Tech</div>
                                <div className="flex leading-10">
                                    <div>Tôi tên là:</div>
                                    <div className="flex flex-shrink flex-grow h-[32px] pl-1">
                                        <span className="relative z-10 pl-3 inline-block w-full dotted">
                                            {employee?.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex leading-10 gap-2">
                                    <div className="flex w-1/2">
                                        <div>Ngày, tháng, năm sinh:</div>
                                        <div className="flex flex-shrink flex-grow h-[32px] pl-1">
                                            <span className="relative z-10 pl-3 inline-block w-full dotted">
                                                {employee?.dateOfBirth &&
                                                    format(
                                                        employee?.dateOfBirth,
                                                        "dd-MM-yyyy"
                                                    )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2">
                                        <div> CCCD/CMT:</div>
                                        <div className="flex flex-shrink flex-grow h-[32px] pl-1">
                                            <span className="relative z-10 pl-3 inline-block w-full dotted">
                                                {
                                                    employee?.citizenIdentificationNumber
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    Tôi làm đơn này, đề nghị Ban Giám đốc cho
                                    tôi xin nghỉ việc vì lý do:
                                </div>
                                <div className="custom-area relative">
                                    <TextArea
                                        className="!pt-[11px] !pl-0"
                                        bordered={false}
                                        autoSize={{ minRows: 1 }}
                                        value={reasonForEnding}
                                        maxLength={240}
                                        onChange={(e) => {
                                            setReasonForEnding(e.target.value);
                                        }}
                                        spellCheck={false}
                                        readOnly={role === ROLE.MANAGE}
                                    />
                                </div>
                                <div className="leading-9">
                                    Trong thời gian chờ đợi sự chấp thuận của
                                    Ban Giám đốc Công ty, tôi sẽ tiếp tục làm
                                    việc nghiêm túc và tiến hành bàn giao công
                                    việc cũng như tài sản cho người quản lý trực
                                    tiếp của tôi.
                                </div>
                                <div className="mt-5">
                                    Tôi xin chân thành cảm ơn!
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {Conclusion(
                        employee?.endDay ? employee?.endDay : new Date(),
                        employee?.name
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuitJob;
