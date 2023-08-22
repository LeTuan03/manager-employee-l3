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
import lodash from "lodash";
import {
    STATUS,
    STATUS_EMPLOYEE,
    REGEX,
    OPTION_TEAM,
    MESSAGE_ERROR,
    OPTION_GENDER,
} from "../../constants/constants";
import { createEmployee, postAvatar, updateEmployee } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllEmployee,
    getEmployee,
    setIsLoading,
} from "../../redux/employee/employeeSlice";
import { validateAge, validateEmployeeCode } from "../common/Validate";
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
            submitProfileStatus: NEW_SAVE,
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
                `${import.meta.env.VITE_BACKEND_URL}/public/image/${res?.data?.name
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
        if (!lodash.isEmpty(employee)) {
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
                                            pattern: REGEX.NAME,
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
                                        options={OPTION_GENDER}
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
                                            validator: validateAge(60, 18),
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
                                            pattern: REGEX.CITIZEN_IDENTIFICATION_NUMBER,
                                            message:MESSAGE_ERROR.CITIZEN_IDENTIFICATION_NUMBER,
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
                                            validator: validateAge(),
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
                                            pattern: REGEX.PHONE,
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
                                        options={OPTION_TEAM}
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
