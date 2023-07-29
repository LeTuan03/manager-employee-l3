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
import { deleteExp, getExp, postExp, updateExp } from "../services/api";
import _, { values } from "lodash";
import { format } from "date-fns";
const TabProfile = ({ employee }) => {
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [openForm, setOpenForm] = useState(false);
    const [exp, setExp] = useState([]);
    const onFinish = async (values) => {
        const {
            companyName,
            jobDescription,
            endDate,
            startDate,
            leavingReason,
            companyAddress,
        } = values;
        const data = {
            companyName,
            jobDescription,
            leavingReason,
            companyAddress,
            startDate,
            endDate,
        };
        if (values?.id) {
            await handleUpdate(values?.id, data);
        } else {
            await handlePostExp(data);
        }
    };
    const handlePostExp = async (data) => {
        const res = await postExp(employee?.id, [data]);
        if (res?.data?.code === 200) {
            setExp(res?.data?.data);
        }
    };
    const handleUpdate = async (id, data) => {
        const res = await updateExp(id, data);
        if (res?.data?.code === 200) {
            await handleGetExp();
        }
    };
    const handleGetExp = async () => {
        try {
            if (!_.isEmpty(employee)) {
                const res = await getExp(employee?.id);
                // console.log(res?.data?.data);
                setExp(res?.data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteExp = async (id) => {
        const res = await deleteExp(id);
        if (res?.data?.code === 200) {
            await handleGetExp();
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
                                value={employee?.skill || ""}
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
                                placeholder="Hoạt động của bạn !"
                                value={employee?.activity || ""}
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
                                    : employee?.team === 2
                                    ? "Front-end"
                                    : "Tester"}
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
                            <PlusOutlined
                                className="cursor-pointer"
                                onClick={() => {
                                    setOpenForm(!openForm);
                                }}
                            />
                        </div>
                        <Form
                            className={openForm ? "" : "hidden"}
                            form={form}
                            layout="vertical"
                            autoComplete="off"
                            onFinish={onFinish}
                        >
                            <Row gutter={[12, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        name="startDate"
                                        label="Ngày bắt đầu"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input type="date"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="endDate"
                                        label="Ngày kết thúc"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input type="date"></Input>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[12, 0]} className="h-fit mb-0">
                                <Col span={12}>
                                    <Form.Item
                                        name="companyName"
                                        label="Tên công ty"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="companyAddress"
                                        label="Địa chỉ công ty"
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                className="h-fit mb-0"
                                name="jobDescription"
                                label="Mô tả"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="h-fit"
                                name="leavingReason"
                                label="Lí do rời "
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item hidden name="id">
                                <Input hidden />
                            </Form.Item>
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        {values?.id ? "Cập nhật" : "Lưu"}
                                    </Button>
                                    <Button htmlType="reset">Reset</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                        {exp?.length > 0 &&
                            exp.map((item) => {
                                return (
                                    <>
                                        <div className="flex justify-between mb-2 group">
                                            <div>
                                                <div className="font-medium">
                                                    {format(
                                                        new Date(
                                                            item.startDate
                                                        ),
                                                        "dd/MM/yyy"
                                                    )}{" "}
                                                    -{" "}
                                                    {format(
                                                        new Date(item.endDate),
                                                        "dd/MM/yyy"
                                                    )}{" "}
                                                    <BankOutlined />{" "}
                                                    <span className="uppercase">
                                                        {item.companyName}
                                                    </span>
                                                </div>
                                                <span className="pl-5">
                                                    {item.jobDescription}
                                                </span>
                                            </div>
                                            <div
                                                className="bg-[#e4e4e4] opacity-0 group-hover:opacity-100 flex 
                                        justify-center gap-2 items-center p-2 rounded-md"
                                            >
                                                <EditOutlined
                                                    onClick={() => {
                                                        form.setFieldsValue({
                                                            ...item,
                                                            startDate: format(
                                                                new Date(
                                                                    item.startDate
                                                                ),
                                                                "yyyy-MM-dd"
                                                            ),
                                                            endDate: format(
                                                                new Date(
                                                                    item.endDate
                                                                ),
                                                                "yyyy-MM-dd"
                                                            ),
                                                        });
                                                    }}
                                                    className="text-blue-600 text-lg cursor-pointer"
                                                />
                                                <DeleteOutlined
                                                    onClick={() => {
                                                        handleDeleteExp(
                                                            item.id
                                                        );
                                                    }}
                                                    className="text-red-600 text-lg cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
