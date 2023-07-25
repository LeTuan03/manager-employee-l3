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
    Modal,
    Image,
} from "antd";
import { format } from "date-fns";
import _ from "lodash";
import { createEmployee, postAvatar, updateEmployee } from "../services/api";
const FormEmployee = ({
    form,
    employee,
    family,
    certificate,
    employeeId,
    setOpen,
}) => {
    const [userAvatar, setUserAvatar] = useState("");
    const [urlAvatar, setUrlAvatar] = useState("");
    // const values = Form.useWatch([], form);
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
            image: `${
                import.meta.env.VITE_BACKEND_URL
            }/public/image/${urlAvatar}`,
            phone,
            citizenIdentificationNumber,
            employeeFamilyDtos: family || [],
            certificatesDto: certificate || [],
            ethnic,
            religion,
            dateOfIssuanceCard,
            placeOfIssueCard,
        };
        if (employeeId) {
            await handleUpdateEmployee(data);
        } else {
            await handleCreateEmployee(data);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    // useEffect(() => {
    //     console.log(values)
    // }, [values?.name])
    const handleCreateEmployee = async (data) => {
        const res = await createEmployee(data);
        if (res?.data?.code === 200) {
            setOpen(false); // đoạn này dispatch lên để get all , dùng context dể tránh props drilling
        }
    };
    const handleUpdateEmployee = async (data) => {
        const res = await updateEmployee(employeeId, data);
    };
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await postAvatar(file);
        if (res) {
            onSuccess("ok");
            setUrlAvatar(res?.data?.name);
        } else {
            onError("Error");
        }
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    // async function handleFormValidation() {
    //     try {
    //         await form.validateFields({ validateOnly: true });
    //         setLoading(true);
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // }
    const propUploads = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
                getBase64(info.file.originFileObj, (url) => {
                    setUserAvatar(url);
                });
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    useEffect(() => {
        if (!_.isEmpty(employee)) {
            form.setFieldsValue({
                name: employee.name,
                code: employee.code,
                gender: employee.gender,
                dateOfBirth: format(
                    new Date(employee.dateOfBirth),
                    "yyyy-MM-dd"
                ),
                address: employee.address,
                team: employee.team,
                email: employee.email,
                phone: employee.phone,
                citizenIdentificationNumber:
                    employee.citizenIdentificationNumber,
                dateOfIssuanceCard: format(
                    new Date(employee.dateOfIssuanceCard),
                    "yyyy-MM-dd"
                ),
                placeOfIssueCard: employee.placeOfIssueCard,
                ethnic: employee.ethnic,
                religion: employee.religion,
            });
            setUserAvatar(employee.image);
            console.log(employee);
        }
        return () => {
            form.resetFields();
            setUserAvatar("");
        };
    }, [employee]);
    return (
        <>
            {/* {name&&"phong"} */}
            <Form
                disabled={employeeId}
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
                    <Col span={18}>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Tên nhân viên"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn cần nhập trường này",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="code" label="Mã nhân viên">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="gender" label="Giới tính">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dateOfBirth"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn cần nhập trường này",
                                        },
                                    ]}
                                >
                                    <Input type="date"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="ethnic" label="Dân tộc">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="religion" label="Tôn giáo">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Số CCCD/CMT"
                                    name="citizenIdentificationNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn cần nhập trường này",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="dateOfIssuanceCard"
                                    label="Ngày cấp"
                                >
                                    <Input type="date"></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name="placeOfIssueCard"
                                    label="Nơi cấp"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={15}>
                            <Col span={8}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bạn cần nhập trường này",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="phone" label="Số điện thoại">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name="team" label="Nhóm">
                                    <Input />
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
                                            message: "Bạn cần nhập trường này",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="flex justify-center items-start" span={6}>
                        <div className="flex justify-center flex-col gap-3 items-center">
                            {userAvatar ? (
                                <Image
                                    sizes={160}
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
                            {!employeeId && (
                                <Upload {...propUploads}>
                                    <Button icon={<UploadOutlined />}>
                                        Click to Upload
                                    </Button>
                                </Upload>
                            )}
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormEmployee;
