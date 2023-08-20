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
} from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { deleteExp, getExp, postExp, updateExp } from "../../services/api";
import _ from "lodash";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { GENDER, STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import ModalDelete from "../ModalDelete";
import TeamStatus from "../common/TeamStatus";
import TextToTruncate from "../common/TextToTruncate";
import { setIsLoading } from "../../redux/employee/employeeSlice";
const { NEW_SAVE, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const TabProfile = ({
    setThreeInfo,
    threeInfo,
    setErrorThreeInfo,
    errorThreeInfo,
}) => {
    const dispatch = useDispatch();
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
            companyName: companyName.trim(),
            jobDescription: jobDescription.trim(),
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
    const handleShowError = (error) => {
        console.log(error);
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi xảy ra!");
    };
    const handleChange = (e) => {
        setThreeInfo({ ...threeInfo, [e.target.name]: e.target.value });
        if (e.target.value === "") {
            switch (e.target.name) {
                case "knowledge":
                    setErrorThreeInfo({
                        ...errorThreeInfo,
                        [e.target.name]: `Vui lòng nhập học vấn của bạn`,
                    });
                    break;
                case "skill":
                    setErrorThreeInfo({
                        ...errorThreeInfo,
                        [e.target.name]: `Vui lòng nhập kĩ năng của bạn`,
                    });
                    break;
                case "activity":
                    setErrorThreeInfo({
                        ...errorThreeInfo,
                        [e.target.name]: `Vui lòng nhập hoạt động của bạn`,
                    });
                    break;
                default:
                    break;
            }
        } else {
            setErrorThreeInfo({ ...errorThreeInfo, [e.target.name]: "" });
        }
    };
    const handlePostExp = async (data) => {
        try {
            dispatch(setIsLoading(true));
            const res = await postExp(employee?.id, [data]);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                setOpenForm(false);
                form.resetFields();
                message.success("Thêm thành công!");
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
        }
    };
    const handleUpdate = async (id, data) => {
        try {
            dispatch(setIsLoading(true));
            const res = await updateExp(id, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                setOpenForm(false);
                form.resetFields();
                message.success("Cập nhật thành công!");
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
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
            handleShowError(error);
        }
    };
    const handleDeleteExp = async (id) => {
        try {
            dispatch(setIsLoading(true));
            const res = await deleteExp(id);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                if (id === values?.id) {
                    form.resetFields();
                }
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            handleShowError(error);
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
        return () => {
            form.resetFields();
            setOpenForm(false);
        };
    }, [employee]);

    function validateDate(_, value) {
        if (value) {
            const startDate = new Date(values.startDate);
            const endDate = new Date(values.endDate);
            const currentDateTime = new Date();
            if (new Date(value) > currentDateTime) {
                return Promise.reject(
                    new Error("Yêu cầu chọn trước ngày hôm nay")
                );
            } else if (startDate > endDate) {
                return Promise.reject(
                    new Error("Ngày kết thúc phải sau ngày bắt đầu")
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
                        <Avatar
                            width={200}
                            height={200}
                            src={employee?.image}
                            size={200}
                        />
                        <div className="leading-10">
                            <div>
                                <div className="flex mt-10 leading-4 my-3 break-all">
                                    <MailOutlined className="mr-3" />
                                    {employee?.email && employee?.email}
                                </div>
                            </div>
                            <div>
                                <PhoneOutlined className="mr-3" />
                                {employee?.phone}
                            </div>
                            <div title={employee?.address}>
                                <div className="flex leading-4 my-3">
                                    <EnvironmentOutlined className="mr-3" />
                                    {employee?.address}
                                </div>
                            </div>
                            <div>
                                <UserOutlined className="mr-3" />
                                {employee?.gender === GENDER.FEMALE
                                    ? "Nữ"
                                    : employee?.gender === GENDER.MALE
                                    ? "Nam"
                                    : "Khác"}
                            </div>
                            <div>
                                <GiftOutlined className="mr-3" />
                                {employee?.dateOfBirth &&
                                    format(
                                        new Date(
                                            employee?.dateOfBirth
                                        ).getTime(),
                                        "dd/MM/yyyy"
                                    )}
                            </div>
                        </div>
                        <h2 className="mt-5">KĨ NĂNG</h2>
                        <Col className="pr-4 mb-3">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[7px] !px-0"
                                    readOnly={
                                        ![
                                            NEW_SAVE,
                                            REJECT,
                                            ADDITIONAL_REQUIREMENTS,
                                        ].includes(
                                            employee?.submitProfileStatus
                                        )
                                    }
                                    spellCheck={false}
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
                                {errorThreeInfo?.skill && (
                                    <p className="text-red-600">
                                        {errorThreeInfo?.skill}
                                    </p>
                                )}
                            </div>
                        </Col>
                        <h2 className="mt-5">HOẠT ĐỘNG</h2>
                        <Col className="pr-4 mb-3">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[7px] !px-0"
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
                                {errorThreeInfo?.activity && (
                                    <p className="text-red-600">
                                        {errorThreeInfo?.activity}
                                    </p>
                                )}
                            </div>
                        </Col>
                    </div>
                    <div className="basis-3/4 ">
                        <div
                            className="pl-10"
                            style={{ borderLeft: "1px solid" }}
                        >
                            <div className="border-l-2">
                                <h1>
                                    {employee?.name &&
                                        TextToTruncate(employee?.name, 25)}
                                </h1>
                                <div className="text-lg w-fit">
                                    {TeamStatus(employee?.team)}
                                </div>
                            </div>
                            <div className="border-l-2 mt-8">
                                <div>
                                    <h2 className="text-lg mb-3">HỌC VẤN</h2>
                                    <div className="relative bg-[#e7e7e7] p-3 pt-5 rounded-lg">
                                        <span className="absolute top-0 left-[8px] text-3xl z-50">
                                            <i>❝</i>
                                        </span>
                                        <div className="relative pl-3">
                                            <TextArea
                                                className="!pt-[8px] !px-0 !pr-4"
                                                placeholder="Học vấn của bạn!"
                                                spellCheck={false}
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
                                            <span className="absolute right-[8px] bottom-[-0.7em] text-3xl z-50">
                                                <i>❞</i>
                                            </span>
                                        </div>
                                    </div>
                                    {errorThreeInfo?.knowledge && (
                                        <p className="text-red-600">
                                            {errorThreeInfo?.knowledge}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div
                            className="pl-10"
                            style={{ borderLeft: "1px solid" }}
                        >
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
                                    <TextArea
                                        showCount
                                        autoSize={{
                                            minRows: 2,
                                        }}
                                        maxLength={2000}
                                    />
                                </Form.Item>
                                <Form.Item hidden name="id">
                                    <Input hidden />
                                </Form.Item>
                                <Form.Item className="mt-8">
                                    <Space>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className=" w-[100px]"
                                        >
                                            {values?.id ? "Cập nhật" : "Lưu"}
                                        </Button>
                                        <Button
                                            htmlType="reset"
                                            type="primary"
                                            className=" w-[100px]"
                                            danger
                                        >
                                            Đặt lại
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                            {exp?.length > 0 &&
                                exp.map((item) => {
                                    return (
                                        <div
                                            className="group mb-3 relative"
                                            key={item.id}
                                        >
                                            <div>
                                                <div className="font-medium">
                                                    <div className="flex items-center flex-wrap">
                                                        {item?.startDate &&
                                                            format(
                                                                new Date(
                                                                    item.startDate
                                                                ),
                                                                "dd/MM/yyy"
                                                            )}{" "}
                                                        <b className="mx-1">
                                                            -
                                                        </b>{" "}
                                                        {item?.endDate &&
                                                            format(
                                                                new Date(
                                                                    item.endDate
                                                                ),
                                                                "dd/MM/yyy"
                                                            )}
                                                        <span className="bg-[#000000e0] rounded-full w-[1em] h-[1em] text-[10px] mx-3"></span>
                                                        <span className="uppercase">
                                                            {item.companyName}{" "}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="relative custom-area ml-3">
                                                    <TextArea
                                                        className="!pt-[8px] !px-0 !w-full"
                                                        value={
                                                            item.jobDescription
                                                        }
                                                        bordered={false}
                                                        autoSize
                                                        readOnly
                                                    ></TextArea>
                                                </div>
                                            </div>
                                            {[
                                                NEW_SAVE,
                                                REJECT,
                                                ADDITIONAL_REQUIREMENTS,
                                            ].includes(
                                                employee.submitProfileStatus
                                            ) && (
                                                <div
                                                    className="bg-[#e4e4e4] opacity-0 group-hover:opacity-100 flex w-12 h-12 top-0
                                        justify-center gap-2 items-center p-2 rounded-md absolute left-[102%]"
                                                >
                                                    <EditOutlined
                                                        onClick={() => {
                                                            form.setFieldsValue(
                                                                {
                                                                    ...item,
                                                                    startDate:
                                                                        format(
                                                                            new Date(
                                                                                item.startDate
                                                                            ),
                                                                            "yyyy-MM-dd"
                                                                        ),
                                                                    endDate:
                                                                        format(
                                                                            new Date(
                                                                                item.endDate
                                                                            ),
                                                                            "yyyy-MM-dd"
                                                                        ),
                                                                }
                                                            );
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
                        <ModalDelete
                            handleDeleteEmployee={handleDeleteExp}
                            employeeIdToDelete={employeeIdToDelete}
                            openDelete={openDelete}
                            setOpenDelete={setOpenDelete}
                        ></ModalDelete>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
