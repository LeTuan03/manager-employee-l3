import React, { useEffect, useState } from "react";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
    Form,
    Input,
    message,
    Row,
    Col,
    Avatar,
    Upload,
    Button,
    Image,
    Select,
} from "antd";
import { format } from "date-fns";
import _ from "lodash";
import {
    GENDER,
    STATUS,
    TEAM,
    STATUS_EMPLOYEE,
} from "../../constants/constants";
import { createEmployee, postAvatar, updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
    setIsLoading,
} from "../../redux/employee/employeeSlice";
const FormEmployee = ({ form, family, certificate, setActiveKey }) => {
    const [userAvatar, setUserAvatar] = useState("");
    const [urlAvatar, setUrlAvatar] = useState("");
    const dispatch = useDispatch();
    const { employee, isLoading } = useSelector((state) => state.employee);
    const { NEW_SAVE, PENDING, ADDITIONAL_REQUIREMENTS, REJECT } =
        STATUS_EMPLOYEE;
    const onFinish = async (values) => {
        const {
            name,
            code,
            gender,
            dateOfBirth,
            address,
            team,
            email,
            phone,
            citizenIdentificationNumber,
            ethnic,
            religion,
            dateOfIssuanceCard,
            placeOfIssueCard,
        } = values;
        const data = {
            name,
            code,
            gender,
            dateOfBirth,
            address,
            team,
            email,
            image: urlAvatar,
            phone,
            citizenIdentificationNumber,
            employeeFamilyDtos: family || [],
            certificatesDto: certificate || [],
            ethnic,
            religion,
            dateOfIssuanceCard,
            placeOfIssueCard,
            submitProfileStatus: "1",
        };
        if (employee?.id) {
            await handleUpdateEmployee(data);
        } else {
            await handleCreateEmployee(data);
        }
    };
    const showFailed = (error) => {
        console.log(error);
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi!");
    };
    const onFinishFailed = (errorInfo) => {
        setActiveKey("1");
        console.log("Failed:", errorInfo);
    };
    const handleCreateEmployee = async (data) => {
        try {
            dispatch(setIsLoading(true));
            const res = await createEmployee(data);
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(
                    getAllEmployee({
                        status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
                    })
                );
                dispatch(getEmployee(res?.data?.data?.id));
                message.success("Thêm nhân viên thành công");
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            showFailed(error);
        }
    };
    const handleUpdateEmployee = async (data) => {
        try {
            dispatch(setIsLoading(true));
            const res = await updateEmployee(employee?.id, data);
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(
                    getAllEmployee({
                        status: `${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`,
                    })
                );
                dispatch(getEmployee(res?.data?.data?.id));
                message.success("Cập nhật nhân viên thành công");
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            showFailed(error);
        }
    };
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await postAvatar(file);
        if (res) {
            onSuccess("ok");
            setUrlAvatar(
                `${import.meta.env.VITE_BACKEND_URL}/public/image/${
                    res?.data?.name
                }`
            );
        } else {
            onError("Error");
        }
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Chỉ được tải lên tệp có dạng JPG/PNG !");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Ảnh phải nhỏ hơn 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };
    const propUploads = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        accept: "image/*",
        beforeUpload,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} tải lên thành công`);
                getBase64(info.file.originFileObj, (url) => {
                    setUserAvatar(url);
                });
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} tải lên thất bại.`);
            }
        },
    };

    useEffect(() => {
        if (!_.isEmpty(employee)) {
            form.setFieldsValue({
                ...employee,
                dateOfBirth: format(
                    new Date(employee.dateOfBirth),
                    "yyyy-MM-dd"
                ),
                dateOfIssuanceCard: format(
                    new Date(employee.dateOfIssuanceCard),
                    "yyyy-MM-dd"
                ),
            });
            setUserAvatar(employee.image);
            setUrlAvatar(employee.image);
        }
        return () => {
            form.resetFields();
            setUserAvatar("");
            setUrlAvatar("");
        };
    }, [employee]);
    const validateAge = (_, value) => {
        if (value) {
            const today = new Date();
            const inputDate = new Date(value);
            const ageDiff = today.getFullYear() - inputDate.getFullYear();
            const monthDiff = today.getMonth() - inputDate.getMonth();
            const dayDiff = today.getDate() - inputDate.getDate();
            const isOver18 =
                ageDiff > 18 ||
                (ageDiff === 18 && monthDiff > 0) ||
                (ageDiff === 18 && monthDiff === 0 && dayDiff >= 0);
            const isUnder60 =
                ageDiff < 60 ||
                (ageDiff === 60 && monthDiff < 0) ||
                (ageDiff === 60 && monthDiff === 0 && dayDiff < 0);
            if (!isOver18) {
                return Promise.reject(new Error("Tuổi phải lớn hơn 18 "));
            } else if (!isUnder60) {
                return Promise.reject(new Error("Tuổi phải nhỏ hơn 60!"));
            } else {
                return Promise.resolve();
            }
        } else {
            return Promise.reject(new Error("Vui lòng nhập ngày sinh"));
        }
    };
    function validateEmployeeCode(_, value) {
        if (value) {
            let regexString = "^NV";
            const year = new Date().getFullYear().toString().slice(-2);
            regexString += year;
            regexString += "\\d{3}$";
            const employeeCodeRegex = new RegExp(regexString);
            const check = employeeCodeRegex.test(value);
            if (!check) {
                return Promise.reject(
                    new Error(
                        "Mã nhân viên phải có định dạng NV-YY-XXX ví dụ: NV23001"
                    )
                );
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error("Vui lòng nhập mã nhân viên"));
        }
    }
    function validateDateOfBirth(_, value) {
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
            return Promise.reject(new Error("Vui lòng nhập ngày sinh"));
        }
    }
    return (
        <>
            <Form
                disabled={isLoading}
                layout={"vertical"}
                form={form}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col lg={18} span={24}>
                        <Row gutter={15}>
                            <Col md={8} span={12}>
                                <Form.Item
                                    label="Tên nhân viên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập tên nhân viên!",
                                        },
                                        {
                                            pattern:
                                                /^(?!.* {2})[^\d!@#$%^&*()+.=_-]{2,}$/g,
                                            message: "Tên sai định dạng",
                                        },
                                    ]}
                                >
                                    <Input maxLength={40} showCount />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="code"
                                    label="Mã nhân viên"
                                    rules={[
                                        {
                                            required: true,
                                            validator: validateEmployeeCode,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={24}>
                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui chọn giới tính!",
                                        },
                                    ]}
                                >
                                    <Select
                                        options={[
                                            {
                                                value: GENDER.MALE,
                                                label: "Nam",
                                            },
                                            {
                                                value: GENDER.FEMALE,
                                                label: "Nữ",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col md={8} span={12}>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dateOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                            validator: validateAge,
                                        },
                                    ]}
                                >
                                    <Input type="date"></Input>
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="ethnic"
                                    label="Dân tộc"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập dân tộc!",
                                        },
                                    ]}
                                >
                                    <Input maxLength={30} showCount />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={24}>
                                <Form.Item
                                    name="religion"
                                    label="Tôn giáo"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập tôn giáo!",
                                        },
                                    ]}
                                >
                                    <Input maxLength={30} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col md={8} span={24}>
                                <Form.Item
                                    label="Số CCCD/CMT"
                                    name="citizenIdentificationNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập số CCCD/CMT!",
                                        },
                                        {
                                            pattern: /^(?:\d{9}|\d{12})$/,
                                            message:
                                                "CMT phải là 9 số, CCCD phải là 12 số!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="dateOfIssuanceCard"
                                    label="Ngày cấp"
                                    rules={[
                                        {
                                            required: true,
                                            validator: validateDateOfBirth,
                                        },
                                    ]}
                                >
                                    <Input type="date"></Input>
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="placeOfIssueCard"
                                    label="Nơi cấp"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập nơi cấp!",
                                        },
                                    ]}
                                >
                                    <Input maxLength={50} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col md={8} span={24}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập email!",
                                        },
                                        {
                                            type: "email",
                                            message:
                                                "Định dạng email chưa đúng!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Vui lòng nhập số điện thoại!",
                                        },
                                        {
                                            pattern: /^0\d{9}$/,
                                            message:
                                                "Định dạng số điện thoại chưa đúng",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="team"
                                    label="Nhóm"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn nhóm!",
                                        },
                                    ]}
                                >
                                    <Select
                                        options={[
                                            {
                                                value: TEAM.FE,
                                                label: "Front-end",
                                            },
                                            {
                                                value: TEAM.BE,
                                                label: "Back-end",
                                            },
                                            {
                                                value: TEAM.TESTER,
                                                label: "Tester",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    label="Địa chỉ cụ thể"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập địa chỉ!",
                                        },
                                    ]}
                                >
                                    <Input maxLength={100} showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        className="flex justify-center items-start"
                        lg={6}
                        span={24}
                    >
                        <div className="flex justify-center flex-col gap-3 items-center">
                            {userAvatar ? (
                                <Image
                                    width={200}
                                    height={200}
                                    className="rounded-full overflow-hidden"
                                    src={userAvatar}
                                />
                            ) : (
                                <Avatar
                                    className="cursor-pointer"
                                    size={200}
                                    icon={<UserOutlined />}
                                />
                            )}
                            <Upload {...propUploads}>
                                <Button icon={<UploadOutlined />}>
                                    Tải ảnh lên
                                </Button>
                            </Upload>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormEmployee;
