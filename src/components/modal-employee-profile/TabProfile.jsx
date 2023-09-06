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
    StarOutlined,
    StarFilled,
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
import { convertToLiFormat } from "../common/InsertDashAfterNewLine";
const { NEW_SAVE, ADDITIONAL_REQUIREMENTS, REJECT } = STATUS_EMPLOYEE;
const TabProfile = ({
    setThreeInfo,
    threeInfo,
    setErrorThreeInfo,
    errorThreeInfo,
}) => {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const [editActive, setEditActive] = useState(false);
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
            <div className="bg-[#e7e7e7] p-14 max-h-[490px] overflow-y-scroll relative profile-font">
                <div className=" bg-white flex flex-row min-h-[720px] p-[7.5%_3.7%]">
                    <div className="basis-[36.8%]">
                        <div className="text-center pr-[11%]">
                            <Avatar
                                width={224}
                                height={224}
                                src={employee?.image}
                            />
                        </div>
                        <h4 className="mt-[52px] !text-lg mb-1 tracking-[.8px]">
                            KỸ NĂNG
                        </h4>
                        <Col className="mb-[22px] pr-[7%]">
                            <div className="relative">
                                {edit ? (
                                    <div className="custom-area">
                                        <TextArea
                                            className="tracking-[0.3px] px-0 pt-[8px]"
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
                                            onBlur={() => setEdit(false)}
                                        ></TextArea>
                                        {errorThreeInfo?.skill && (
                                            <p className="text-red-600">
                                                {errorThreeInfo?.skill}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <ul
                                        onDoubleClick={() => setEdit(true)}
                                        className="pl-6 !leading-[25px] mt-[12px] tracking-[0.1px]"
                                        dangerouslySetInnerHTML={{
                                            __html: convertToLiFormat(
                                                threeInfo?.skill
                                            ),
                                        }}
                                    ></ul>
                                )}
                            </div>
                        </Col>
                        <h4 className="!text-lg mb-4 tracking-[0.8px]">
                            NGOẠI NGỮ
                        </h4>
                        <Col className="mb-7 pr-[29%] flex justify-between">
                            <p className="tracking-[0.5px]">Tiếng Anh</p>
                            <div className="flex gap-4">
                                <StarFilled className="text-sm" />
                                <StarFilled className="text-sm" />
                                <StarFilled className="text-sm" />
                            </div>
                        </Col>
                        <h4 className="!text-lg mb-4 tracking-[0.8px]">
                            TIN HỌC
                        </h4>
                        <Col className="mb-3 pr-[29%] flex justify-between">
                            <p className="tracking-[0.5px]">Word</p>
                            <div className="flex gap-4">
                                <StarFilled className="text-sm" />
                                <StarFilled className="text-sm" />
                                <StarFilled className="text-sm" />
                            </div>
                        </Col>
                        <Col className="mb-[26px] pr-[29%] flex justify-between">
                            <p className="tracking-[0.5px]">Excel</p>
                            <div className="flex gap-4">
                                <StarFilled className="text-sm" />
                                <StarFilled className="text-sm" />
                                <StarOutlined className="text-sm" />
                            </div>
                        </Col>
                        <h4 className="mt-4 !text-lg mb-1 tracking-[0.9px]">
                            HOẠT ĐỘNG
                        </h4>
                        <Col className="mb-3 pr-[9%]">
                            <div className="relative">
                                {editActive ? (
                                    <div className="custom-area">
                                        <TextArea
                                            className="!pt-[8px] tracking-[0.9px] px-0"
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
                                            name="activity"
                                            maxLength={240}
                                            autoSize={{ minRows: 1 }}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }}
                                            placeholder="Hoạt động của bạn !"
                                            value={threeInfo?.activity}
                                            onBlur={() => setEditActive(false)}
                                        ></TextArea>
                                        {errorThreeInfo?.activity && (
                                            <p className="text-red-600">
                                                {errorThreeInfo?.activity}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <ul
                                        onDoubleClick={() =>
                                            setEditActive(true)
                                        }
                                        className="pl-6 !leading-[25px] mt-[12px] tracking-[0.1px]"
                                        dangerouslySetInnerHTML={{
                                            __html: convertToLiFormat(
                                                threeInfo?.activity
                                            ),
                                        }}
                                    ></ul>
                                )}
                            </div>
                        </Col>
                        <h4 className="mt-4 !text-lg mb-1 tracking-[0.9px]">
                            SỞ THÍCH
                        </h4>
                        <Col className="mb-3 pt-[2px]">
                            <div className="relative tracking-[0.2px]">
                                <ul className="p-0 pl-[22px]">
                                    <li>Học ngoại ngữ mới</li>
                                    <li>
                                        Chơi rubix, chơi game suy luận, chiến
                                        thuật
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <h4 className="mt-6 !text-lg mb-1 tracking-[0.7px]">
                            NGƯỜI LIÊN HỆ
                        </h4>
                        <Col className="mb-3 pt-2">
                            <div className="relative tracking-[0.2px]">
                                <ul className="p-0 pl-[22px]">
                                    <li>
                                        <b>Lê Thị Thu Hiền</b>
                                    </li>
                                    <p className="mt-2">Công ty Cổng Vàng</p>
                                    <p>Sales Manager and Marketer</p>
                                    <p>090 560 3700</p>
                                </ul>
                            </div>
                        </Col>
                    </div>
                    <div className="basis-[63.2%]">
                        <div>
                            <div className="pl-8 border-l-profile mb-6">
                                <p className="!text-[37px] break-all font-[500] reset-default tracking-[3.95px]">
                                    {employee?.name}
                                </p>
                                <p className="w-fit reset-default tracking-[2.3px]">
                                    {TeamStatusProfile(employee?.team)}
                                </p>
                            </div>
                            <div className="info-profile">
                                <div className="flex gap-10">
                                    <div className="basis-1/2">
                                        <div className="mb-2 tracking-[0.1px]">
                                            <UserOutlined className="mr-4 bg-[#615f64] text-white p-[11px] rounded-full" />
                                            {Gender(employee?.gender)}
                                        </div>
                                        <div className="flex items-center break-all mb-2 tracking-[0.1px]">
                                            <GiftOutlined className="mr-4 bg-[#615f64] text-white p-[11px] rounded-full" />
                                            {employee?.dateOfBirth &&
                                                format(
                                                    new Date(
                                                        employee?.dateOfBirth
                                                    ).getTime(),
                                                    "dd/MM/yyyy"
                                                )}
                                        </div>
                                        <div
                                            title={employee?.address}
                                            className="flex items-center break-all mb-2 tracking-[0.1px]"
                                        >
                                            <EnvironmentOutlined className="mr-4 bg-[#615f64] text-white p-[11px] !leading-0 rounded-full" />
                                            <p> {employee?.address}</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/2">
                                        <div className="break-all mb-2">
                                            <div className="flex items-center break-all tracking-[0.1px]">
                                                <MailOutlined className="mr-4 bg-[#615f64] text-white p-[11px] rounded-full" />
                                                <p>{employee?.email}</p>
                                            </div>
                                        </div>
                                        <div className="tracking-[0.1px]">
                                            <PhoneOutlined className="mr-4 bg-[#615f64] text-white p-[11px]  rounded-full" />
                                            {employee?.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[25px] pl-8 border-l-profile">
                                <div>
                                    <h4 className="mb-[16px] !text-lg tracking-[.7px]">
                                        MỤC TIÊU NGHỀ NGHIỆP
                                    </h4>
                                    <div className="relative bg-[#e7e7e7] pt-3 rounded-lg">
                                        <span className="absolute top-[-3px] left-[3px] z-50">
                                            <i className="!text-3xl">❝</i>
                                        </span>
                                        <div className="relative pl-3 pb-[1px]">
                                            <TextArea
                                                className="!pt-[9px] !pl-0 !pr-4 tracking-[0.2px]"
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
                                            <span className="absolute right-[15px] bottom-[-9px] z-50">
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
                        <div className="pl-8 border-l-profile mt-4">
                            <div className="border-l-2 flex justify-between items-center">
                                <h4 className="my-3 !text-lg mb-3 tracking-wide">
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
                                                    <div className="flex items-center flex-wrap !text-[17px] !font-[500] mt-[2px] tracking-[0.5px]">
                                                        {item?.startDate &&
                                                            format(
                                                                new Date(
                                                                    item.startDate
                                                                ),
                                                                "MM/yyy"
                                                            )}{" "}
                                                        <p className="mx-1">
                                                            -
                                                        </p>{" "}
                                                        {item?.endDate &&
                                                            format(
                                                                new Date(
                                                                    item.endDate
                                                                ),
                                                                "MM/yyy"
                                                            )}
                                                        <span className="bg-[#000000e0] rounded-full w-[1em] h-[1em] text-[5px] mx-[14px]"></span>
                                                        <span className="uppercase !text-[17px] !font-[500]">
                                                            {item.companyName}
                                                        </span>
                                                    </div>
                                                    <div className="uppercase mt-[1px] !text-[17px] !font-[500] tracking-[0.2px]">
                                                        {item.companyAddress}
                                                    </div>
                                                </div>
                                                <div className="relative ml-3">
                                                    <ul
                                                        className="pl-[11px] pt-[10px] leading-6 ul-profile"
                                                        dangerouslySetInnerHTML={{
                                                            __html: convertToLiFormat(
                                                                item.jobDescription
                                                            ),
                                                        }}
                                                    ></ul>
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
                        <div className="pl-8 border-l-profile mt-[30px]">
                            <div className="border-l-2">
                                <h4 className="!text-lg tracking-[1.2px]">
                                    CHỨNG CHỈ
                                </h4>
                            </div>
                            <div className="relative mt-[6px] leading-6 tracking-[0.25px]">
                                <ul className="p-0 pl-[22px]">
                                    <li>
                                        2017: Chứng chỉ tin học văn phòng
                                        Microsoft Office
                                    </li>
                                    <li>
                                        2019: Chứng chỉ khóa học Kỹ năng thuyết
                                        trình chuyên nghiệp
                                    </li>
                                    <li>2021: TOIEC 800</li>
                                </ul>
                            </div>
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
