import React, { useEffect, useState } from "react";
import {
    MailOutlined,
    UserOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    GiftOutlined,
    ProfileFilled,
} from "@ant-design/icons";
import { Button, Col, Form, Image, Input, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { deleteExp, getExp, postExp, updateExp } from "../../services/api";
import _ from "lodash";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import TextToTruncate from "../../hook/TextToTruncate";
import { GENDER, STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import ModalDelete from "../ModalDelete";
const { NEW_SAVE, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const TabProfile = ({ setThreeInfo, threeInfo }) => {
    const { employee } = useSelector((state) => state.employee);
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
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
            companyAddress,
        } = values;
        const data = {
            companyName,
            jobDescription,
            leavingReason: "no public",
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
    const handleChange = (e) => {
        setThreeInfo({ ...threeInfo, [e.target.name]: e.target.value });
    };
    const handlePostExp = async (data) => {
        try {
            const res = await postExp(employee?.id, [data]);
            if (res?.data?.code === STATUS.SUCCESS) {
                setExp(res?.data?.data);
                setOpenForm(false);
                form.resetFields();
            } else {
                message.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleUpdate = async (id, data) => {
        try {
            const res = await updateExp(id, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                setOpenForm(false);
                form.resetFields();
            } else {
                message.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleGetExp = async () => {
        try {
            const res = await getExp(employee?.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setExp(res?.data?.data);
            } else {
                message.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteExp = async (id) => {
        try {
            const res = await deleteExp(id);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                if (id === values?.id) {
                    form.resetFields();
                }
            } else {
                message.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (!_.isEmpty(employee)) {
            handleGetExp();
            setThreeInfo({
                knowledge: employee?.knowledge,
                skill: employee?.skill,
                activity: employee?.activity,
            });
        }
    }, [employee]);
    function validateDate(_, value) {
        if (value) {
            const inputDateTime = new Date(value);
            const currentDateTime = new Date();
            if (inputDateTime > currentDateTime) {
                return Promise.reject(
                    new Error("Yêu cầu chọn trước ngày hôm nay")
                );
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(`Vui lòng nhập ngày`));
        }
    }
    return (
        <div>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll">
                <div className=" bg-white flex flex-row min-h-[720px] p-[6%_10%] ">
                    <div className="basis-1/4 pr-10">
                        <Image
                            width={200}
                            height={200}
                            className="rounded-full overflow-hidden"
                            fallback={employee?.image}
                        />
                        <div className="leading-10">
                            <div className="mt-10">
                                <MailOutlined className="mr-3" />
                                {employee?.email &&
                                    TextToTruncate(employee?.email, 20)}
                            </div>
                            <div>
                                <PhoneOutlined className="mr-3" />
                                {employee?.phone}
                            </div>
                            <div>
                                <EnvironmentOutlined className="mr-3" />
                                {employee?.address &&
                                    TextToTruncate(employee?.address, 20)}
                            </div>
                            <div>
                                <UserOutlined className="mr-3" />
                                {employee?.gender === GENDER.FEMALE
                                    ? "Nữ"
                                    : "Nam"}
                            </div>
                            <div>
                                <GiftOutlined className="mr-3" />
                                {employee?.dateOfBirth &&
                                    format(
                                        new Date(
                                            employee?.dateOfBirth
                                        ).getTime(),
                                        "dd-MM-yyyy"
                                    )}
                            </div>
                        </div>
                        <h2 className="mt-5">Kĩ năng</h2>
                        <Col className=" pr-4 mb-3">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[8px]"
                                    readOnly={
                                        ![
                                            NEW_SAVE,
                                            REJECT,
                                            ADDITIONAL_REQUIREMENTS,
                                        ].includes(
                                            employee?.submitProfileStatus
                                        )
                                    }
                                    bordered={false}
                                    maxLength={240}
                                    autoSize={{ minRows: 1 }}
                                    placeholder="Kĩ năng của bạn !"
                                    name="skill"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    value={threeInfo?.skill}
                                ></TextArea>
                            </div>
                        </Col>
                        <h2 className="mt-5">Hoạt động</h2>
                        <Col className="pr-4 mb-3">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[8px]"
                                    readOnly={
                                        ![
                                            NEW_SAVE,
                                            REJECT,
                                            ADDITIONAL_REQUIREMENTS,
                                        ].includes(
                                            employee?.submitProfileStatus
                                        )
                                    }
                                    bordered={false}
                                    name="activity"
                                    maxLength={240}
                                    autoSize={{ minRows: 1 }}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    placeholder="Hoạt động của bạn !"
                                    value={threeInfo?.activity}
                                ></TextArea>
                            </div>
                        </Col>
                    </div>
                    <div className="basis-3/4 pl-10">
                        <div className="border-l-2">
                            <h1>
                                {employee?.name &&
                                    TextToTruncate(employee?.name, 25)}
                            </h1>
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
                                    <span className="absolute top-[-0.4em] left-[4px] text-3xl z-50">
                                        ❝
                                    </span>
                                    <div className="custom-area relative">
                                        <TextArea
                                            className="!pt-[8px]"
                                            placeholder="Học vấn của bạn!"
                                            bordered={false}
                                            maxLength={240}
                                            autoSize={{ minRows: 1 }}
                                            readOnly={
                                                ![
                                                    NEW_SAVE,
                                                    REJECT,
                                                    ADDITIONAL_REQUIREMENTS,
                                                ].includes(
                                                    employee?.submitProfileStatus
                                                )
                                            }
                                            name="knowledge"
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            value={threeInfo?.knowledge}
                                        />
                                        <span className="absolute right-[8px] bottom-[-0.6em] text-3xl z-50">
                                            ❞
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-l-2 flex justify-between items-center mt-6">
                            <h2 className="my-5">KINH NGHIỆM LÀM VIỆC</h2>
                            {[
                                NEW_SAVE,
                                REJECT,
                                ADDITIONAL_REQUIREMENTS,
                            ].includes(employee?.submitProfileStatus) && (
                                <PlusOutlined
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setOpenForm(!openForm);
                                    }}
                                />
                            )}
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
                                                validator: validateDate,
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
                                                validator: validateDate,
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
                                                message:
                                                    "Vui lòng nhập tên công ty!",
                                            },
                                        ]}
                                    >
                                        <Input maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="companyAddress"
                                        label="Địa chỉ công ty"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập địa chỉ công ty!",
                                            },
                                        ]}
                                    >
                                        <Input maxLength={100} />
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
                                        message: "Vui lòng nhập mô tả!",
                                    },
                                ]}
                            >
                                <TextArea autoSize showCount maxLength={240} />
                            </Form.Item>
                            <Form.Item hidden name="id">
                                <Input hidden />
                            </Form.Item>
                            <Form.Item className="mt-8">
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                        {values?.id ? "Cập nhật" : "Lưu"}
                                    </Button>
                                    <Button htmlType="reset">Đặt lại</Button>
                                </Space>
                            </Form.Item>
                        </Form>
                        <ModalDelete
                            handleDeleteEmployee={handleDeleteExp}
                            employeeIdToDelete={employeeIdToDelete}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                        ></ModalDelete>
                        {exp?.length > 0 &&
                            exp.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="flex justify-between group mb-5"
                                    >
                                        <div>
                                            <div className="font-medium">
                                                <div>
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
                                                    <ProfileFilled className="mx-2" />{" "}
                                                    <span className="uppercase">
                                                        {item.companyName}
                                                    </span>
                                                </div>
                                            </div>
                                            <span>
                                                Mô tả: {item.jobDescription}
                                            </span>
                                        </div>
                                        {[
                                            NEW_SAVE,
                                            REJECT,
                                            ADDITIONAL_REQUIREMENTS,
                                        ].includes(
                                            employee.submitProfileStatus
                                        ) && (
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
                                                        setOpenForm(true);
                                                    }}
                                                    className="text-blue-600 text-lg cursor-pointer"
                                                />
                                                <DeleteOutlined
                                                    onClick={() => {
                                                        setEmployeeIdToDelete(
                                                            item.id
                                                        );
                                                        setOpenDelete(true);
                                                    }}
                                                    className="text-red-600 text-lg cursor-pointer"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
