import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message, Row, Col, Avatar, Upload, Button, Modal, Image, Select } from "antd";
import { format } from 'date-fns';
import _ from 'lodash';
import { STATUS } from '../../constants/constants'
import { createEmployee, postAvatar, updateEmployee } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployee, setOpen } from '../../redux/employee/employeeSlice';
const FormEmployee = ({ form, employee, family, certificate, employeeId }) => {
    const [userAvatar, setUserAvatar] = useState("")
    const [urlAvatar, setUrlAvatar] = useState("")
    // const values = Form.useWatch([], form);
    const dispatch = useDispatch()
    const { open } = useSelector((state) => state.employee)
    const onFinish = async (values) => {
        const { name, code, gender, dateOfBirth, address, team, email, phone,
            citizenIdentificationNumber, ethnic, religion, dateOfIssuanceCard, placeOfIssueCard } = values;
        const data = {
            name,
            code,
            gender,
            dateOfBirth,
            address,
            team,
            email,
            image: `${import.meta.env.VITE_BACKEND_URL}/public/image/${urlAvatar}`,
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
            await handleUpdateEmployee(data)
        } else {
            await handleCreateEmployee(data)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const handleCreateEmployee = async (data) => {
        const res = await createEmployee(data);
        if (res?.data?.code === STATUS.SUCCESS  ) {
            dispatch(setOpen({ ...open, modalInput: false }))
            dispatch(getAllEmployee("1,2,4,5"))
        }
    };
    const handleUpdateEmployee = async (data) => {
        const res = await updateEmployee(employeeId, data)
    }
    const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
        const res = await postAvatar(file)
        if (res) {
            onSuccess('ok')
            setUrlAvatar(res?.data?.name)
        } else {
            onError('Error')
        }
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const propUploads = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUploadAvatar,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                getBase64(info.file.originFileObj, (url) => {
                    setUserAvatar(url)
                })
            } else if (info.file.status === 'error') {
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
                dateOfBirth: format(new Date(employee.dateOfBirth), "yyyy-MM-dd"),
                address: employee.address,
                team: employee.team,
                email: employee.email,
                phone: employee.phone,
                citizenIdentificationNumber: employee.citizenIdentificationNumber,
                dateOfIssuanceCard: format(new Date(employee.dateOfIssuanceCard), "yyyy-MM-dd"),
                placeOfIssueCard: employee.placeOfIssueCard,
                ethnic: employee.ethnic,
                religion: employee.religion,
            })
            setUserAvatar(employee.image)
        }
        return () => {
            form.resetFields()
            setUserAvatar("")
        }
    }, [employee])
    const validateAge = (_, value) => {
        const today = new Date();
        const inputDate = new Date(value);
        const ageDiff = today.getFullYear() - inputDate.getFullYear();
        const isOver18 = ageDiff > 18 || (ageDiff === 18 && today.getMonth() > inputDate.getMonth())
            || (ageDiff === 18 && today.getMonth() === inputDate.getMonth() && today.getDate() >= inputDate.getDate());
        if (!isOver18) {
            return Promise.reject(new Error('Yêu cầu trên 18 tuổi!'));
        }
        return Promise.resolve();
    };
    return (
        <>
            <Form
                disabled={employeeId}
                layout={'vertical'}
                form={form}
                name="basic"
                initialValues={{
                    remember: true
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
                                            message: "Vui lòng nhập tên nhân viên!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="code"
                                    label="Mã nhân viên"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={24}>
                                <Form.Item
                                    name="gender"
                                    label="Giới tính"
                                >
                                    <Select
                                        options={[
                                            {
                                                value: 0,
                                                label: "Nam",
                                            },
                                            {
                                                value: 1,
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
                                            message: "Vui lòng nhập ngày sinh",
                                        },
                                        {
                                            validator: validateAge,
                                        },
                                    ]}
                                >
                                    <Input type="date" ></Input>
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
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col md={8} span={24}>
                                <Form.Item
                                    name="religion"
                                    label="Tôn giáo"
                                >
                                    <Input />
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
                                            message: "Vui lòng nhập số CCCD/CMT!",
                                        }, {
                                            min: 9, max: 12,
                                            message: "CMT phải là 9 số, CCCD phải là 12 số!",
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
                                >
                                    <Input type="date" ></Input>
                                </Form.Item>
                            </Col>
                            <Col md={8} span={12}>
                                <Form.Item
                                    name="placeOfIssueCard"
                                    label="Nơi cấp"
                                >
                                    <Input />
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
                                            type: 'email',
                                            message: "Định dạng email chưa đúng!",
                                        }
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
                                            message: "Vui lòng nhập số điện thoại!",
                                        },
                                        {
                                            pattern: /^0\d{9}$/,
                                            message: "Định dạng số điện thoại chưa đúng",
                                        }
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
                                                value: 0,
                                                label: "Front-end",
                                            },
                                            {
                                                value: 1,
                                                label: "Back-end",
                                            },
                                            {
                                                value: 2,
                                                label: "Tester",
                                            }
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
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='flex justify-center items-start' lg={6} span={24}>
                        <div className='flex justify-center flex-col gap-3 items-center'>
                            {userAvatar ? <Image
                                width={200}
                                height={200}
                                className="rounded-full overflow-hidden"
                                src={userAvatar}
                            /> : <Avatar className='cursor-pointer' size={200} icon={<UserOutlined />} />}
                            {!employeeId && <Upload {...propUploads}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>}
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormEmployee;