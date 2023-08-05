import React, { useEffect, useState } from "react";
import { Form, Input, message, Row, Col, Button, Table, Select } from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    createFamily,
    deleteFamily,
    getFamilyByEmployeeId,
    updateFamily,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { GENDER, RELATIONSHIP, STATUS } from "../../constants/constants";
import { useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
const TabEmployeeFamily = ({ setFamily, family }) => {
    const [formFamily] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(null);
    const { employee } = useSelector((state) => state.employee);
    const [openDelete, setOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null);
    const [uidDelete, setUidDelete] = useState(null);
    const onFinish = async (values) => {
        const {
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            relationShip,
            gender,
            phoneNumber,
            address,
        } = values;
        const data = {
            uid: uuidv4(),
            email,
            name,
            citizenIdentificationNumber,
            dateOfBirth,
            gender,
            relationShip,
            phoneNumber,
            address,
            employeeId: employee.id,
        };
        if (update) {
            await handleUpdateFamily(data);
        } else {
            await handleCreateFamily(data);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        setFamily(employee.employeeFamilyDtos);
        return () => {
            setUpdate(null);
            formFamily.resetFields();
        };
    }, [employee]);
    const handleGetFamily = async () => {
        try {
            setLoading(true);
            const res = await getFamilyByEmployeeId(employee.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setFamily(res?.data?.data);
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteFamily = async (id) => {
        try {
            setLoading(true);
            const res = await deleteFamily(id);
            if (res?.data?.code === STATUS.SUCCESS) {
                message.success("Xóa thành công");
                await handleGetFamily();
                setIdDelete(null);
                if (id === update) {
                    setUpdate(null);
                    formFamily.resetFields();
                }
            } else {
                message.error(res?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteByUid = (uid) => {
        const newList = family.filter((item) => item.uid !== uid);
        setFamily(newList);
        setUidDelete(null);
        if (uid === update) {
            setUpdate(null);
            formFamily.resetFields();
        }
        message.success("Xóa thành công văn bằng");
    };
    const handleCreateFamily = async (data) => {
        if (!_.isEmpty(employee)) {
            try {
                setLoading(true);
                const res = await createFamily(employee.id, [data]);
                if (res?.data?.code === STATUS.SUCCESS) {
                    setFamily(res?.data?.data);
                    formFamily.resetFields();
                    message.success("Thêm thành công");
                } else {
                    message.error(res?.data?.message);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            if (_.isEmpty(family)) {
                setFamily([data]);
            } else {
                setFamily([data, ...family]);
            }
            message.success("Thêm thành công văn bằng");
            formFamily.resetFields();
        }
    };
    const handleUpdateFamily = async (data) => {
        const cloneFamily = _.cloneDeep(family);
        const index = cloneFamily.findIndex((item) => item.uid === update);
        if (index === -1) {
            try {
                setLoading(true);
                const res = await updateFamily(update, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    await handleGetFamily();
                    formFamily.resetFields();
                    message.success("Sửa thành công");
                } else {
                    message.error(res?.data?.message);
                }
                setUpdate(null);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            cloneFamily[index] = data;
            setFamily(cloneFamily);
            setUpdate(null);
            formFamily.resetFields();
            message.success("Sửa thành công ");
        }
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            align: "center",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Thao tác",
            align: "center",
            render: (_, family) => (
                <div className="flex justify-center gap-3">
                    <>
                        <span
                            className="cursor-pointer"
                            onClick={() => {
                                family.id
                                    ? setIdDelete(family.id)
                                    : setUidDelete(family.uid);
                                setOpenDelete(true);
                            }}
                        >
                            <DeleteOutlined className="text-red-600 text-lg" />
                        </span>
                        <span
                            onClick={() => {
                                formFamily.setFieldsValue({
                                    ...family,
                                    dateOfBirth: format(
                                        new Date(family.dateOfBirth),
                                        "yyyy-MM-dd"
                                    ),
                                });
                                setUpdate(family.id || family.uid);
                            }}
                            className="cursor-pointer"
                        >
                            <EditOutlined className="text-blue-600 text-lg" />
                        </span>
                    </>
                </div>
            ),
        },
        {
            title: "Họ và tên",
            dataIndex: "name",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            render: (dateOfBirth) => (
                <>{format(new Date(dateOfBirth), "dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            render: (gender) => <>{gender === GENDER.FEMALE ? "Nữ" : "Nam"}</>,
        },
        {
            title: "Quan hệ",
            dataIndex: "relationShip",
            render: (relationShip) => {
                switch (relationShip) {
                    case RELATIONSHIP.CHILD:
                        relationShip = "Con";
                        break;
                    case RELATIONSHIP.PARENTS:
                        relationShip = "Bố/Mẹ";
                        break;
                    case RELATIONSHIP.SIBLINGS:
                        relationShip = "Anh/Chị/Em";
                        break;
                    default:
                        break;
                }
                return <>{relationShip}</>;
            },
        },
        {
            title: "Số CCCD/CMT",
            dataIndex: "citizenIdentificationNumber",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
        },
    ];
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
                className="mb-4"
                layout={"vertical"}
                name="basic"
                form={formFamily}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={15}>
                    <Col md={5} span={12}>
                        <Form.Item
                            label="Họ và tên người thân"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
                                },
                                {
                                    pattern:
                                        /^(?!.*  )[^\d!@#$%^&*()+.=_-]{2,}$/g,
                                    message: "Tên sai định dạng",
                                },
                            ]}
                        >
                            <Input maxLength={30} showCount />
                        </Form.Item>
                    </Col>
                    <Col md={5} span={12}>
                        <Form.Item
                            name="citizenIdentificationNumber"
                            label="Số CCCD/CMT"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số CCCD/CMT!",
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
                    <Col md={5} span={8}>
                        <Form.Item
                            name="dateOfBirth"
                            label="Ngày sinh"
                            rules={[
                                {
                                    validator: validateDateOfBirth,
                                },
                            ]}
                        >
                            <Input type="date"></Input>
                        </Form.Item>
                    </Col>
                    <Col md={5} span={8}>
                        <Form.Item
                            name="relationShip"
                            label="Quan hệ"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
                                },
                            ]}
                        >
                            <Select
                                options={[
                                    {
                                        value: 1,
                                        label: "Con",
                                    },
                                    {
                                        value: 2,
                                        label: "Bố/Mẹ",
                                    },
                                    {
                                        value: 3,
                                        label: "Anh/Chị/Em",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={4} span={8}>
                        <Form.Item
                            name="gender"
                            label="Giới tính"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
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
                    <Col md={6} span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email!",
                                },
                                {
                                    type: "email",
                                    message: "Định dạng email chưa đúng!",
                                },
                            ]}
                        >
                            <Input showCount maxLength={30} />
                        </Form.Item>
                    </Col>
                    <Col md={6} span={12}>
                        <Form.Item
                            name="phoneNumber"
                            label="Số điện thoại"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
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
                    <Col md={8} span={24}>
                        <Form.Item
                            name="address"
                            label="Địa chỉ cụ thể"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn cần nhập trường này",
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col
                        className="flex justify-center items-center gap-2"
                        md={4}
                        span={24}
                    >
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                        >
                            {update ? "Sửa" : "Thêm"}
                        </Button>
                        <Button
                            type="primary"
                            danger
                            htmlType="button"
                            onClick={() => {
                                formFamily.resetFields();
                                setUpdate(null);
                            }}
                        >
                            Đặt lại
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table
                loading={loading}
                scroll={{ x: true, y: 200 }}
                bordered
                dataSource={family}
                columns={columns}
                pagination={false}
            />
            <ModalDelete
                handleDeleteById={handleDeleteFamily}
                handleDeleteByUid={handleDeleteByUid}
                uidDelete={uidDelete}
                idDelete={idDelete}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            ></ModalDelete>
            ;
        </>
    );
};

export default TabEmployeeFamily;
