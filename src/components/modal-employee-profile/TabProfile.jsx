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
import lodash from "lodash";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import ModalDelete from "../ModalDelete";
import { TeamStatusProfile } from "../common/TeamStatus";
import { setIsLoading } from "../../redux/employee/employeeSlice";
import Gender from "../common/Gender";
import { validateDate } from "../common/Validate";
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
        console.error(error);
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
                        [e.target.name]: `Vui lòng nhập mục tiêu của bạn!`,
                    });
                    break;
                case "skill":
                    setErrorThreeInfo({
                        ...errorThreeInfo,
                        [e.target.name]: `Vui lòng nhập kĩ năng của bạn!`,
                    });
                    break;
                case "activity":
                    setErrorThreeInfo({
                        ...errorThreeInfo,
                        [e.target.name]: `Vui lòng nhập hoạt động của bạn!`,
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
    const handleDeleteExp = async () => {
        try {
            dispatch(setIsLoading(true));
            const res = await deleteExp(employeeIdToDelete);
            if (res?.data?.code === STATUS.SUCCESS) {
                await handleGetExp();
                if (employeeIdToDelete === values?.id) {
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
        if (!lodash.isEmpty(employee)) {
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

    return (
        <div>
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll">
                <div className=" bg-white flex flex-row min-h-[720px] p-[7.5%_3.7%] ">
                    <div className="basis-[36.8%]">
                        <div className="text-center pr-[11%]">
                            <Avatar
                                width={216}
                                height={216}
                                src={employee?.image}
                                size={216}
                            />
                        </div>
                        {/* <div className="leading-8">
                            <div>
                                <div className="flex mt-10 leading-4 my-3 break-all">
                                    <MailOutlined className="mr-3" />
                                    {employee?.email}
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
                                {Gender(employee?.gender)}
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
                        </div> */}
                        <h4 className="mt-12 !text-lg mb-1">KĨ NĂNG</h4>
                        {/* pr-4 */}
                        <Col className="mb-3 pr-[13%]">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[8px] !px-0"
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
                        <h4 className="mt-5 !text-lg mb-1">HOẠT ĐỘNG</h4>
                        <Col className="mb-3 pr-[13%]">
                            <div className="custom-area relative">
                                <TextArea
                                    className="!pt-[8px] !px-0"
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
                    <div className="basis-[63.2%]">
                        <div>
                            <div className="pl-8 border-l-profile mb-6">
                                <p className="!text-[37px] break-all font-[600]">
                                    {employee?.name}
                                </p>
                                <p className="w-fit">
                                    {TeamStatusProfile(employee?.team)}
                                </p>
                            </div>
                            <div className="leading-[43px] pl-8 border-l-profile text-base">
                                <div className="flex">
                                    <div className="basis-1/2">
                                        <UserOutlined className="mr-3" />
                                        {Gender(employee?.gender)}
                                    </div>
                                    <div className="basis-1/2">
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
                                <div className="flex">
                                    <div className="basis-1/2">
                                        <div>
                                            <PhoneOutlined className="mr-3" />
                                            {employee?.phone}
                                        </div>
                                    </div>
                                    <div className="basis-1/2">
                                        <div className="break-all">
                                            <MailOutlined className="mr-3" />
                                            {employee?.email}
                                        </div>
                                    </div>
                                </div>
                                <div title={employee?.address}>
                                    <div className="flex leading-4 my-3">
                                        <EnvironmentOutlined className="mr-3" />
                                        {employee?.address}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 pl-8 border-l-profile">
                                <div>
                                    <h4 className="mb-[22px] !text-lg">
                                        MỤC TIÊU NGHỀ NGHIỆP
                                    </h4>
                                    <div className="relative bg-[#e7e7e7] p-3 pt-5 rounded-lg">
                                        <span className="absolute top-1 left-[8px] z-50">
                                            <i className="!text-3xl">❝</i>
                                        </span>
                                        <div className="relative pl-3">
                                            <TextArea
                                                className="!pt-[10px] !px-0 !pr-4"
                                                placeholder="Mục tiêu của bạn!"
                                                spellCheck={false}
                                                bordered={false}
                                                maxLength={240}
                                                autoSize={{ minRows: 2 }}
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
                                            <span className="absolute right-[8px] bottom-[-1.5em] z-50">
                                                <i className="!text-3xl">❞</i>
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
                        <div className="pl-8 border-l-profile">
                            <div className="border-l-2 flex justify-between items-center mt-[16px]">
                                <h4 className="my-3 !text-lg mb-4">
                                    KINH NGHIỆM LÀM VIỆC
                                </h4>
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
                                                    validator: validateDate(
                                                        values?.startDate,
                                                        values?.endDate
                                                    ),
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
                                                    validator: validateDate(
                                                        values?.startDate,
                                                        values?.endDate
                                                    ),
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
                                            label="Chức vụ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Vui lòng nhập chức vụ!",
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
                                            className="group mb-[6px] relative"
                                            key={item.id}
                                        >
                                            <div>
                                                <div>
                                                    <div className="flex items-center flex-wrap !text-[17px] !font-[600]">
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
                                                        <span className="bg-[#000000e0] rounded-full w-[1em] h-[1em] text-[5px] mx-3"></span>
                                                        <span className="uppercase !text-[17px] !font-[600]">
                                                            {item.companyName}
                                                        </span>
                                                    </div>
                                                    <div className="uppercase mb-0 !text-[17px] !font-[600]">
                                                        {item.companyAddress}
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
                                        justify-center gap-2 items-center p-2 rounded-md absolute right-0 z-10"
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
                        {openDelete && (
                            <ModalDelete
                                handleDelete={handleDeleteExp}
                                openDelete={openDelete}
                                setOpenDelete={setOpenDelete}
                            ></ModalDelete>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabProfile;
