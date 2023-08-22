import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    message,
    Row,
    Col,
    Button,
    Table,
    Select,
    Empty,
    ConfigProvider,
} from "antd";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
    createFamily,
    deleteFamily,
    getFamilyByEmployeeId,
    updateFamily,
} from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import { GENDER, STATUS } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import TextToTruncate from "../common/TextToTruncate";
import { setIsLoading } from "../../redux/employee/employeeSlice";
import Gender from "../common/Gender";
import { validateAge } from "../common/Validate";
import RelationShip from "../common/RelationShip";
const TabEmployeeFamily = ({ setFamily, family }) => {
    const dispatch = useDispatch();
    const [formFamily] = Form.useForm();
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
    const handleFailded = (error) => {
        console.log(error);
        dispatch(setIsLoading(false));
        message.error("Đã có lỗi!");
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
            dispatch(setIsLoading(true));
            const res = await getFamilyByEmployeeId(employee.id);
            if (res?.data?.code === STATUS.SUCCESS) {
                setFamily(res?.data?.data);
            } else {
                message.error(res?.data?.message);
            }
            dispatch(setIsLoading(false));
        } catch (error) {
            handleFailded(error);
        }
    };
    const handleDelete = async () => {
        if (idDelete) {
            try {
                dispatch(setIsLoading(true));
                const res = await deleteFamily(idDelete);
                if (res?.data?.code === STATUS.SUCCESS) {
                    message.success("Xóa thành công");
                    await handleGetFamily();
                    if (idDelete === update) {
                        setUpdate(null);
                        formFamily.resetFields();
                    }
                    setIdDelete(null);
                } else {
                    message.error(res?.data?.message);
                }
                dispatch(setIsLoading(false));
            } catch (error) {
                handleFailded(error);
            }
        } else {
            const newList = family.filter((item) => item.uid !== uidDelete);
            setFamily(newList);
            setUidDelete(null);
            if (uidDelete === update) {
                setUpdate(null);
                formFamily.resetFields();
            }
            message.success("Xóa thành công");
        }
    };

    const handleCreateFamily = async (data) => {
        if (!lodash.isEmpty(employee)) {
            try {
                dispatch(setIsLoading(true));
                const res = await createFamily(employee.id, [data]);
                if (res?.data?.code === STATUS.SUCCESS) {
                    await handleGetFamily();
                    formFamily.resetFields();
                    message.success("Thêm thành công");
                } else {
                    message.error(res?.data?.message);
                }
                dispatch(setIsLoading(false));
            } catch (error) {
                handleFailded(error);
            }
        } else {
            if (lodash.isEmpty(family)) {
                setFamily([data]);
            } else {
                setFamily([data, ...family]);
            }
            message.success("Thêm thành công");
            formFamily.resetFields();
        }
    };
    const handleUpdateFamily = async (data) => {
        const cloneFamily = _.cloneDeep(family);
        const index = cloneFamily.findIndex((item) => item.uid === update);
        if (index === -1) {
            try {
                dispatch(setIsLoading(true));
                const res = await updateFamily(update, data);
                if (res?.data?.code === STATUS.SUCCESS) {
                    await handleGetFamily();
                    formFamily.resetFields();
                    message.success("Sửa thành công");
                } else {
                    message.error(res?.data?.message);
                }
                setUpdate(null);
                dispatch(setIsLoading(false));
            } catch (error) {
                handleFailded(error);
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
            key: "stt",
            align: "center",
            className: "!min-w-[60px]",
            render: (_, item, index) => <b>{index + 1}</b>,
        },
        {
            title: "Thao tác",
            align: "center",
            className: "!min-w-[100px]",
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
            align: "center",
            className: "!min-w-[120px]",
            render: (name) => (
                <div className="text-left">{TextToTruncate(name, 26)}</div>
            ),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            align: "center",
            render: (dateOfBirth) => (
                <>
                    {dateOfBirth && format(new Date(dateOfBirth), "dd/MM/yyyy")}
                </>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            align: "center",
            className: "!min-w-[90px]",
            render: (gender) => Gender(gender),
        },
        {
            title: "Quan hệ",
            dataIndex: "relationShip",
            align: "center",
            className: "min-w-[100px]",
            render: (relationShip) => RelationShip(relationShip),
        },
        {
            title: "Số CCCD/CMT",
            dataIndex: "citizenIdentificationNumber",
            className: "min-w-[125px]",
            render: (citizenIdentificationNumber) =>
                citizenIdentificationNumber,
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            align: "center",
            className: "min-w-[80px]",
            render: (address) => <div className="text-left">{address}</div>,
        },
    ];

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
                                        /^(?!.* {2})[^\d!@#$%^&*()+.=_-]{2,}$/g,
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
                                    validator: validateAge(100),
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
                                    {
                                        value: GENDER.OTHER,
                                        label: "Khác",
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
                                {
                                    pattern:
                                        /^(?!.* {2})[^!@#$%^&*()+.=_]{2,}$/g,
                                    message: "Sai định dạng",
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col md={4} span={24}>
                        <Form.Item label=" ">
                            <div className="flex justify-center items-center gap-2">
                                <Button
                                    type="primary"
                                    className=" w-[100px]"
                                    htmlType="submit"
                                >
                                    {update ? "Lưu" : "Thêm"}
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
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <ConfigProvider
                renderEmpty={() => (
                    <>
                        <Empty description={false} />
                    </>
                )}
            >
                <div className="main-table">
                    <Table
                        scroll={{ x: true, y: 200 }}
                        bordered
                        dataSource={family}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </ConfigProvider>
            {openDelete && (
                <ModalDelete
                    handleDelete={handleDelete}
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                ></ModalDelete>
            )}
        </>
    );
};

export default TabEmployeeFamily;
