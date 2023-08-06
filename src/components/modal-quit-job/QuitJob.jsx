import { Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/constants";

const QuitJob = ({ reasonForEnding, setReasonForEnding, employees }) => {
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
                                            {employees?.name || employee?.name}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex leading-10 gap-2">
                                    <div className="flex w-1/2">
                                        <div>Ngày, tháng, năm sinh:</div>
                                        <div className="flex flex-shrink flex-grow h-[32px] pl-1">
                                            <span className="relative z-10 pl-3 inline-block w-full dotted">
                                                {(employees?.dateOfBirth &&
                                                    format(
                                                        employees?.dateOfBirth,
                                                        "dd-MM-yyyy"
                                                    )) ||
                                                    (employee?.dateOfBirth &&
                                                        format(
                                                            employee?.dateOfBirth,
                                                            "dd-MM-yyyy"
                                                        ))}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex w-1/2">
                                        <div> CCCD/CMT:</div>
                                        <div className="flex flex-shrink flex-grow h-[32px] pl-1">
                                            <span className="relative z-10 pl-3 inline-block w-full dotted">
                                                {employees?.citizenIdentificationNumber ||
                                                    employee?.citizenIdentificationNumber}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    Tôi làm đơn này, đề nghị Ban Gián đốc cho
                                    tôi xin nghỉ việc vì lý do:
                                </div>
                                <div className="custom-area relative">
                                    <TextArea
                                        className="!pt-[11px]"
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
                                    Ban Giám đốc Công ty, tôi sẽ tiếp tục <br />{" "}
                                    làm việc nghiêm túc và tiến hành bàn giao
                                    công việc cũng như tài sản cho người <br />{" "}
                                    quản lý trực tiếp của tôi.
                                </div>
                                <div className="mt-5">
                                    Tôi xin chân thành cảm ơn!
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-10">
                        <Col span={12}></Col>
                        <Col span={12} className="text-center">
                            <div>
                                <i className="block">
                                    Hà Nội, ngày{" "}
                                    {format(
                                        employee?.endDay
                                            ? new Date(employee?.endDay)
                                            : new Date(),
                                        "dd"
                                    )}{" "}
                                    tháng{" "}
                                    {format(
                                        employee?.endDay
                                            ? new Date(employee?.endDay)
                                            : new Date(),
                                        "MM"
                                    )}{" "}
                                    năm{" "}
                                    {format(
                                        employee?.endDay
                                            ? new Date(employee?.endDay)
                                            : new Date(),
                                        "yyyy"
                                    )}
                                </i>
                                <h3>NGƯỜI LÀM ĐƠN</h3>
                                <i className="block">(Ký, ghi rõ họ tên)</i>
                                <b className="block mt-5">
                                    {employees?.name || employee?.name}
                                </b>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default QuitJob;
