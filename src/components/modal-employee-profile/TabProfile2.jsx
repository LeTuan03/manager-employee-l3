import React, { useEffect, useState } from "react";
import {
    MailOutlined,
    WifiOutlined,
    WhatsAppOutlined,
    UserOutlined,
    PlusOutlined,
    BankOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { deleteExp, getExp, postExp, updateExp } from "../../services/api";
import _ from "lodash";
import { format } from "date-fns";
import { STATUS } from "../../constants/constants";
const TabProfile = ({ employee }) => {
    const [exp, setExp] = useState([]);

    const handleGetExp = async () => {
        try {
            if (!_.isEmpty(employee)) {
                const res = await getExp(employee?.id);
                setExp(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetExp();
    }, [employee]);
    return (
        <div>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll">
                <div className=" bg-white flex flex-row min-h-[720px] p-[6%_10%] ">
                    <div className="basis-1/4 p-10">
                        <Image
                            width={200}
                            height={200}
                            className="rounded-full overflow-hidden"
                            fallback={employee?.image}
                        />
                        <div className="mt-10">
                            <MailOutlined className="mr-3" />
                            {employee?.email}
                        </div>
                        <div>
                            <WhatsAppOutlined className="mr-3" />
                            {employee?.phone}
                        </div>
                        <div>
                            <WifiOutlined className="mr-3" />
                            {employee?.address}
                        </div>
                        <div>
                            <UserOutlined className="mr-3" />
                            {employee?.gender === 1
                                ? "Nam"
                                : employee?.gender === 2
                                ? "Nữ"
                                : "Khác"}
                        </div>
                        <div className="birth"></div>
                        <h2 className="my-5">Kĩ năng</h2>
                        <Col className="relative pr-4 mb-3">
                            <Input
                                bordered={false}
                                placeholder="Kĩ năng của bạn !"
                                name="skill"
                            ></Input>
                            <div
                                className="border-0 border-b border-dotted absolute 
                                        top-[65%] w-full left-1"
                            ></div>
                        </Col>
                        <h2 className="my-5">Hoạt động</h2>
                        <Col className="relative pr-4 mb-3">
                            <Input
                                bordered={false}
                                name="activity"
                                placeholder="Hoạt động của bạn !"
                            ></Input>
                            <div
                                className="border-0 border-b border-dotted absolute 
                                        top-[65%] w-full left-1"
                            ></div>
                        </Col>
                    </div>
                    <div className="basis-2/4 pl-10">
                        <div className="border-l-2">
                            <h1>{employee?.name}</h1>
                            <div className="text-lg">
                                {employee?.team === 1
                                    ? "Back-end"
                                    : "Front-end"}
                            </div>
                        </div>
                        <div className="border-l-2 mt-8">
                            <div>
                                <div className="text-lg mb-3">HỌC VẤN</div>
                                <div className="relative">
                                    <span className="absolute top-[-4px] left-[4px] text-3xl z-50">
                                        ❝
                                    </span>
                                    <TextArea
                                        placeholder="Học vấn của bạn!"
                                        autoSize
                                        name="knowledge"
                                        className="bg-slate-200 pl-7 border-none py-3 !min-h-[50px]"
                                    />
                                    <span className="absolute right-[8px] bottom-[-10px] text-3xl z-50">
                                        ❞
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-l-2 flex justify-between items-center mt-10">
                            <div className="text-lg">KINH NGHIỆM LÀM VIỆC</div>
                            <PlusOutlined className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
