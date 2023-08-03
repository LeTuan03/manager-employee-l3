import React, { useEffect, useState } from 'react';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, message, Row, Col, Avatar, Upload, Button, Image, Select } from "antd";
import { format } from 'date-fns';
import _ from 'lodash';
import { GENDER, STATUS, TEAM } from '../../constants/constants'
import { createEmployee, postAvatar, updateEmployee } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployee, setOpen } from '../../redux/employee/employeeSlice';    
import { STATUS_EMPLOYEE } from "../../constants/constants";
const FormEmployee = ({ form, family, certificate, employeeId, setEmployeeId, setLoading }) => {
    const [userAvatar, setUserAvatar] = useState("")
    const [urlAvatar, setUrlAvatar] = useState("")
    const dispatch = useDispatch()
    const { open, employee } = useSelector((state) => state.employee)
    const {
        NEW_SAVE,
        PENDING,
        ADDITIONAL_REQUIREMENTS,
        REJECT
    } = STATUS_EMPLOYEE;
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
            submitProfileStatus: "1"
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
        try {
            setLoading(true)
            const res = await createEmployee(data);
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(getAllEmployee(`${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`))
                setEmployeeId(res?.data?.data?.id)
                form.setFieldsValue({
                    name: employee.name,
                    code: employee.code,
                    gender: employee.gender,
                    dateOfBirth: employee.dateOfBirth && format(new Date(employee.dateOfBirth), "yyyy-MM-dd"),
                    address: employee.address,
                    team: employee.team,
                    email: employee.email,
                    phone: employee.phone,
                    citizenIdentificationNumber: employee.citizenIdentificationNumber,
                    dateOfIssuanceCard: employee.dateOfBirth && format(new Date(employee.dateOfIssuanceCard), "yyyy-MM-dd"),
                    placeOfIssueCard: employee.placeOfIssueCard,
                    ethnic: employee.ethnic,
                    religion: employee.religion,
                })
                setUserAvatar(employee.image)
                message.success("Thêm nhân viên thành công")
            } else {
                message.error(res?.data?.message)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };
    const handleUpdateEmployee = async (data) => {
        try {
            setLoading(true)
            const res = await updateEmployee(employeeId, data)
            if (res?.data?.code === STATUS.SUCCESS) {
                dispatch(setOpen({ ...open, modalInput: false }))
                dispatch(getAllEmployee(`${NEW_SAVE},${PENDING},${ADDITIONAL_REQUIREMENTS},${REJECT}`))
            } else {
                message.error(res?.data?.message)
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
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
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Chỉ được tải lên tệp có dạng JPG/PNG !');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Ảnh phải nhỏ hơn 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const propUploads = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        accept: "video/*,image/*",
        beforeUpload,
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
        if (value) {
            const today = new Date();
            const inputDate = new Date(value);
            const ageDiff = today.getFullYear() - inputDate.getFullYear();
            const isOver18 = ageDiff > 18 || (ageDiff === 18 && today.getMonth() > inputDate.getMonth())
                || (ageDiff === 18 && today.getMonth() === inputDate.getMonth() && today.getDate() >= inputDate.getDate());
            if (!isOver18) {
                return Promise.reject(new Error('Yêu cầu trên 18 tuổi!'));
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Vui lòng nhập ngày sinh'));
        }
    };
    function validateEmployeeCode(_, value) {
        if (value) {
            let regexString = '^NV';
            const year = new Date().getFullYear().toString().slice(-2);
            regexString += year;
            regexString += '\\d{3}$';
            const employeeCodeRegex = new RegExp(regexString);
            const check = employeeCodeRegex.test(value)
            if (!check) {
                return Promise.reject(new Error('Mã nhân viên phải có định dạng NV-YY-XXX ví dụ: NV23001'))
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Vui lòng nhập mã nhân viên'));
        }
    }
    function validateDateOfBirth(_, value) {
        if (value) {
            const inputDateTime = new Date(value);
            const currentDateTime = new Date();
            if (inputDateTime > currentDateTime) {
                return Promise.reject(new Error("Yêu cầu chọn trước ngày hôm nay"));
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error('Vui lòng nhập ngày sinh'));
        }
    }
    return (
        <>
            <Form
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
                                        {
                                            pattern: /^(?!.*  )[^\d!@#$%^&*()+.=_-]{2,}$/g,
                                            message: "Tên sai định dạng",
                                        }
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
                                            validator: validateEmployeeCode
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
                                            validator: validateAge,
                                        }
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
                                            message: "Vui lòng nhập số CCCD/CMT!",
                                        }, {
                                            pattern: /^(?:\d{9}|\d{12})$/,
                                            message: "CMT phải là 9 số, CCCD phải là 12 số!",
                                        }
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
                                            validator: validateDateOfBirth
                                        },
                                    ]}
                                >
                                    <Input type="date" ></Input>
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
                                    <Input maxLength={100} showCount />
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
                            <Upload {...propUploads}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default FormEmployee;