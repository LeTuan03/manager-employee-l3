import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    FastBackwardOutlined,
} from "@ant-design/icons";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    Input,
    Modal,
    Row,
    Select,
    Table,
    Tabs,
    message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
    addProcessByEmp,
    addSalaryByEmp,
    deleteProcess,
    deleteProposal,
    deleteSalary,
    updateProposal,
    getEmployeeById,
    getProcessByEmp,
    getProposalByEmp,
    getSalaryByEmp,
    updateProcess,
    updateSalary,
    addProposalByEmp,
} from "../services/api";
import { format } from "date-fns";
import SentLeader from "./SendLeader";

export default function UpdateHappeningModal({ employee }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [salary, setSalary] = useState([]);
    const [processs, setProcesss] = useState([]);
    const [recoments, setRecoments] = useState([]);

    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: <TabIncreaseSalary employee={employee} salary={salary} />,
        },
        {
            key: "2",
            label: `THĂNG CHỨC`,
            children: <TabProcess employee={employee} processs={processs} />,
        },
        {
            key: "3",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: (
                <TabRecommendation employee={employee} recoments={recoments} />
            ),
        },
    ];

    const handleGetSalaryByEmp = async () => {
        const res = await getSalaryByEmp(employee.id);
        setSalary(res?.data?.data);
    };
    const handleGetProcessByEmp = async () => {
        const res = await getProcessByEmp(employee.id);
        setProcesss(res?.data?.data);
    };
    const handleGetRecomentByEmp = async () => {
        const res = await getProposalByEmp(employee.id);
        setRecoments(res?.data?.data);
    };
    return (
        <div>
            <span
                className="cursor-pointer"
                onClick={() => {
                    setIsModalOpen(true);
                    handleGetSalaryByEmp();
                    handleGetProcessByEmp();
                    handleGetRecomentByEmp();
                }}
            >
                <FastBackwardOutlined className="text-green-600 text-lg" />
            </span>
            <Modal
                title="CẬP NHẬT DIỄN BIẾN"
                centered
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <div className="text-center">
                        <Button key="submit" type="primary">
                            Kết thúc
                        </Button>
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <Row className="mt-7">
                    <Col span={8} className="flex flex-col items-center">
                        <Image width={200} src={employee.image} />
                        <h1>{employee.name}</h1>
                        <b>
                            {employee.currentPosition === 3
                                ? "Front-end"
                                : employee.currentPosition === 2
                                ? "Back-end"
                                : "Tester"}
                        </b>
                    </Col>
                    <Col span={16}>
                        <Card
                            title="Thông tin nhân viên"
                            bordered={false}
                            className="w-full"
                        >
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>Họ và tên</Col>
                                <Col span={8}>Mã nhân viên </Col>
                                <Col span={8}>Số điện thoại</Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>
                                    <Input value={employee.name} />
                                </Col>
                                <Col span={8}>
                                    <Input value={employee.code} />
                                </Col>
                                <Col span={8}>
                                    <Input value={employee.phone} />
                                </Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>Email</Col>
                                <Col span={8}>CCCD/CMT</Col>
                                <Col span={8}>Ngày sinh</Col>
                            </Row>
                            <Row gutter={16} className="mb-2">
                                <Col span={8}>
                                    <Input value={employee.email} />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        value={
                                            employee.citizenIdentificationNumber
                                        }
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input
                                        value={format(
                                            new Date(
                                                employee.dateOfBirth
                                            ).getTime(),
                                            "yyyy/MM/dd"
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <div className="mt-10">
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </Modal>
        </div>
    );
}

//tab

const TabIncreaseSalary = ({ salary, employee }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày tăng lương",
            dataIndex: "startDate",
            key: "startDate",
            render: (text) => (
                <a>{format(new Date(text).getTime(), "yyyy/MM/dd")}</a>
            ),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
        },
        {
            title: "Lương cũ",
            dataIndex: "oldSalary",
            key: "oldSalary",
        },
        {
            title: "Lương mới",
            dataIndex: "newSalary",
            key: "newSalary",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Lý do",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Trạng thái",
            dataIndex: "salaryIncreaseStatus",
            key: "salaryIncreaseStatus",
            render: (salaryIncreaseStatus) => {
                switch (salaryIncreaseStatus) {
                    case 0:
                        salaryIncreaseStatus = "Nộp lưu hồ sơ";
                        break;
                    case 1:
                        salaryIncreaseStatus = "Lưu mới";
                        break;
                    case 2:
                        salaryIncreaseStatus = "Chờ xử lí";
                        break;
                    case 3:
                        salaryIncreaseStatus = "Đã được chấp nhận";
                        break;
                    case 4:
                        salaryIncreaseStatus = "Yêu cầu bổ sung";
                        break;
                    case 5:
                        salaryIncreaseStatus = "Từ chối";
                        break;
                    case 6:
                        salaryIncreaseStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case 7:
                        salaryIncreaseStatus =
                            "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case 8:
                        salaryIncreaseStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case 9:
                        salaryIncreaseStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        salaryIncreaseStatus = "Chờ xử lí";
                        break;
                }
                return (
                    <a onClick={() => console.log(typeof salaryIncreaseStatus)}>
                        {salaryIncreaseStatus}
                    </a>
                );
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.salaryIncreaseStatus === 1 ? (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() => handleDelete(employee.id)}
                                />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setPresent(false);
                                    setIsModalOpen(true);
                                    setData(employee);
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [data, setData] = useState({});

    const handleDelete = async (value) => {
        try {
            const res = await deleteSalary(value);
            message.success("Xóa thành công!");
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateSalary(value);
                message.success("Cập nhật thành công!");
            } else {
                const res = await addSalaryByEmp(salary[0].employeeId, [value]);
                message.success("Thêm mới thành công!");
            }
            handleOpenPresent();
            form.resetFields();
        } catch (error) {
            message.error("Cập  nhật thất bại!");
        }
    };
    const handleOpenPresent = () => {
        setIsModalOpen(true);
        setPresent(true);
    };

    return (
        <>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"id"}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"salaryIncreaseStatus"}>
                            <Input value={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="startDate"
                            label="Ngày tăng lương"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="startDate" type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="oldSalary"
                            label="Lương cũ"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input type="number" name="oldSalary" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="newSalary"
                            label="Lương mới"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="newSalary" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className="mb-2">
                    <Col span={9}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="note" />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            name="reason"
                            label="Lý do"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="reason" />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="w-full bg-green-700 text-white"
                                htmlType="submit"
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => form.resetFields()}
                            >
                                Đặt lại
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={salary}
                        pagination={false}
                    />
                </Col>
            </Row>
            <TabSalary
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                present={present}
                setPresent={setPresent}
                employee={employee}
            />
        </>
    );
};

const TabSalary = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
    employee,
}) => {
    const items = [
        {
            key: "1",
            label: `TĂNG LƯƠNG`,
            children: <IncreaseSalaryChildren data={data} />,
        },
    ];

    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={present || isModalOpen}
                width={1300}
                onCancel={() => {
                    setIsModalOpen(false);
                    setPresent(false);
                }}
                footer={
                    <div className="text-center">
                        {present && (
                            <Button
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => {
                                setIsModalOpen(false);
                                setPresent(false);
                            }}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div className="mt-10">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                        style={{ height: 600, overflowY: "scroll" }}
                    />
                </div>
            </Modal>
            <SentLeader
                employee={employee}
                openSendLeader={openModal}
                setOpenSendLeader={setOpenModal}
            />
        </>
    );
};

const IncreaseSalaryChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    return (
        <div className="bg-slate-300 p-10">
            <div className="bg-white p-10">
                <Row>
                    <Col span={12} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số:</p>
                    </Col>
                    <Col span={12} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <b>Độc lập - Tự do - Hạnh phúc</b>
                        <p>--------------------</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center mt-10">
                        <h2>QUYẾT ĐỊNH</h2>
                        <h3>Về việc tăng lương cho người lao động</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div>
                            <i className="block">
                                - Căn cứ vào quy chế lương thưởng và Điều lệ
                                hoạt động của công ty Ocean Tech.
                            </i>
                            <i className="block">
                                - Căn cứ hợp đồng lao động số …/HĐLĐ-...., ngày
                                …. tháng …. năm 20…..
                            </i>
                            <i className="block">
                                - Căn cứ những đóng góp thực tế đối với sự phát
                                triển của Công ty
                            </i>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center m-10">
                        <h3>GIÁM ĐỐC CÔNG TY OCEANTECH</h3>
                        <h3>QUYẾT ĐỊNH</h3>
                    </Col>
                </Row>
                <Row className="flex justify-center">
                    <div>
                        <Col span={24}>
                            <b>Điều 1:</b> Kể từ ngày: 24 tháng 7 năm 2023 , mức
                            lương của Ông/Bà: {empData.name} sẽ là:
                            {"  "} {data.newSalary} đồng
                        </Col>
                        <Col span={24}>
                            <b>Điều 2:</b> Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: wqeqew căn cứ quyết định
                            thi hành.
                        </Col>
                    </div>
                </Row>
                <Row className="mt-10">
                    <Col span={12}></Col>
                    <Col span={12} className="text-center">
                        <div>
                            <i className="block">
                                Hà Nội, ngày ... tháng ... năm 2023
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i className="block">(Ký, ghi rõ họ tên)</i>
                            <b className="block mt-5">{empData.name}</b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

//process

const TabProcess = ({ processs, employee }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày thăng chức",
            dataIndex: "promotionDay",
            key: "promotionDay",
            render: (_, { promotionDay }) => (
                <a>{format(new Date(promotionDay).getTime(), "yyyy/MM/dd")}</a>
            ),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
        },
        {
            title: "Chức vụ cũ",
            dataIndex: "currentPosition",
            key: "currentPosition",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },
        {
            title: "Trạng thái",
            dataIndex: "processStatus",
            key: "processStatus",
            render: (processStatus) => {
                switch (processStatus) {
                    case "0":
                        processStatus = "Nộp lưu hồ sơ";
                        break;
                    case "1":
                        processStatus = "Lưu mới";
                        break;
                    case "2":
                        processStatus = "Chờ xử lí";
                        break;
                    case "3":
                        processStatus = "Đã được chấp nhận";
                        break;
                    case "4":
                        processStatus = "Yêu cầu bổ sung";
                        break;
                    case "5":
                        processStatus = "Từ chối";
                        break;
                    case "6":
                        processStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case "7":
                        processStatus = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case "8":
                        processStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case "9":
                        processStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        processStatus = "Chờ xử lí";
                        break;
                }
                return <a>{processStatus}</a>;
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.processStatus === "1" ? (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() =>
                                        handleDeletePromote(employee.id)
                                    }
                                />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setData(employee);
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [present, setPresent] = useState(false);

    const handleDeletePromote = async (id) => {
        try {
            const res = await deleteProcess(id);
            message.success("Xóa thành công !");
        } catch (error) {
            message.error("Xóa thất bại !");
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProcess(value);
                message.success("Cập nhật thành công !");
            } else {
                const res = await addProcessByEmp(processs[0].employeeId, [
                    value,
                ]);
                message.success("Thêm mới thành công !");
            }
            handleOpenPresent();
            form.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
        }
    };

    const handleOpenPresent = () => {
        setIsModalOpen(true);
        setPresent(true);
    };

    return (
        <>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16} className="mb-2">
                    <Col span={4} className="hidden">
                        <Form.Item name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4} className="hidden">
                        <Form.Item name="processStatus">
                            <Input value={1} />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="promotionDay"
                            label="Ngày thăng chức"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input name="promotionDay" type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="newPosition"
                            label="Chức vụ mới"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Select
                                className="w-full"
                                options={[
                                    {
                                        value: 2,
                                        label: "Giám đốc",
                                    },
                                    {
                                        value: 1,
                                        label: "Trưởng phòng",
                                    },
                                    {
                                        value: 3,
                                        label: "Quản lí",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="mr-5 w-full bg-green-700 text-white"
                                htmlType="submit"
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => form.resetFields()}
                            >
                                Đặt lại
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={processs}
                        pagination={false}
                    />
                </Col>
            </Row>
            <ProcessModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                present={present}
                setPresent={setPresent}
                employee={employee}
            />
        </>
    );
};

const ProcessModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
    employee,
}) => {
    const items = [
        {
            key: "1",
            label: `THĂNG CHỨC`,
            children: <ProcessChildren data={data} />,
        },
    ];

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={present || isModalOpen}
                width={1300}
                onCancel={() => {
                    setIsModalOpen(false);
                    setPresent(false);
                }}
                footer={
                    <div className="text-center">
                        {present && (
                            <Button
                                key="cancel"
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div className="mt-10">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                        style={{ height: 600, overflowY: "scroll" }}
                    />
                </div>
            </Modal>
            <SentLeader
                employee={employee}
                openSendLeader={openModal}
                setOpenSendLeader={setOpenModal}
            />
        </>
    );
};

const ProcessChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    return (
        <div className="bg-slate-300 p-10">
            <div className="bg-white p-10">
                <Row>
                    <Col span={12} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số:</p>
                    </Col>
                    <Col span={12} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <b>Độc lập - Tự do - Hạnh phúc</b>
                        <p>--------------------</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center mt-10">
                        <h2>QUYẾT ĐỊNH</h2>
                        <h3>Về Việc Bổ Nhiệm Cán Bộ, Công Chức</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div>
                            <i className="block">
                                - Căn cứ Nghị định số 138/2020 Nghị định của
                                Chính phủ quy định về tuyển dụng, sử dụng và
                                quản lý công chức.
                            </i>
                            <i className="block">
                                - Căn cứ Luật tổ chức chính quyền địa phương
                                được Quốc hội thông qua ngày 19 tháng 06 năm
                                2015;
                            </i>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center m-10">
                        <h3>GIÁM ĐỐC CÔNG TY OCEANTECH</h3>
                        <h3>QUYẾT ĐỊNH</h3>
                    </Col>
                </Row>
                <Row className="flex justify-center leading-10">
                    <div>
                        <Col span={24}>
                            <b>Điều 1:</b> Bổ nhiệm Ông/Bà: {empData.name} giữ
                            chức vụ kể từ ngày{" "}
                            {/* {format(data.promotionDay, "yyyy-MM-dd")}. */}
                        </Col>
                        <Col span={24}>
                            <b>Điều 2:</b> Quyết định này có hiệu lực kể từ ngày
                            ký.
                        </Col>
                        <Col span={24}>
                            <b>Điều 3:</b>Các ông/bà Phòng Nhân sự, Phòng Tài
                            chính Kế toán và Ông/Bà: {empData.name} chịu trách
                            nhiệm thi hành quyết định này.
                        </Col>
                    </div>
                </Row>
                <Row className="mt-10">
                    <Col span={12}></Col>
                    <Col span={12} className="text-center">
                        <div>
                            <i className="block">
                                Hà Nội, ngày ... tháng ... năm 2023
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i className="block">(Ký, ghi rõ họ tên)</i>
                            <b className="block mt-5"> {empData.name}</b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

// recoment

const TabRecommendation = ({ recoments, employee }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, item, index) => <>{index + 1}</>,
        },
        {
            title: "Ngày diễn biến",
            dataIndex: "proposalDate",
            key: "proposalDate",
            render: (_, { proposalDate }) => (
                <>{format(new Date(proposalDate).getTime(), "yyyy/MM/dd")}</>
            ),
        },
        {
            title: "Loại ",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
        },

        {
            title: "Mô tả chi tiết",
            dataIndex: "detailedDescription",
            key: "detailedDescription",
        },
        {
            title: "Trạng thái",
            dataIndex: "proposalStatus",
            key: "proposalStatus",
            render: (proposalStatus) => {
                switch (proposalStatus) {
                    case "0":
                        proposalStatus = "Nộp lưu hồ sơ";
                        break;
                    case "1":
                        proposalStatus = "Lưu mới";
                        break;
                    case "2":
                        proposalStatus = "Chờ xử lí";
                        break;
                    case "3":
                        proposalStatus = "Đã được chấp nhận";
                        break;
                    case "4":
                        proposalStatus = "Yêu cầu bổ sung";
                        break;
                    case "5":
                        proposalStatus = "Từ chối";
                        break;
                    case "6":
                        proposalStatus = "Gửi yêu cầu kết thúc hồ sơ";
                        break;
                    case "7":
                        proposalStatus = "Chấp nhận yêu cầu kết thúc hồ sơ";
                        break;
                    case "8":
                        proposalStatus =
                            "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ";
                        break;
                    case "9":
                        proposalStatus = "Từ chối yêu cầu kết thúc hồ sơ";
                    default:
                        proposalStatus = "Chờ xử lí";
                        break;
                }
                return <a>{proposalStatus}</a>;
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: (_, employee) => (
                <div>
                    {employee.proposalStatus === 1 ? (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        form.setFieldsValue(employee);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() =>
                                        handleDeleteRecoment(employee.id)
                                    }
                                />
                            </span>
                        </div>
                    ) : (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setData(employee);
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [data, setData] = useState({});

    const handleDeleteRecoment = async (id) => {
        try {
            const res = await deleteProposal(id);
            message.success("Xóa thành công!");
        } catch (error) {
            message.error("Xóa thất bại!");
        }
    };
    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateProposal(value);
                message.success("Cập nhật thành công!");
            } else {
                const res = await addProposalByEmp(recoments[0].employeeId, [
                    value,
                ]);
                message.success("Thêm mới thành công!");
            }
            handleOpenPresent();
            form.resetFields();
        } catch (error) {
            message.error("Cập nhật thất  bại!");
        }
    };
    const handleOpenPresent = () => {
        setIsModalOpen(true);
        setPresent(true);
    };
    return (
        <>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={16} className="mb-2">
                    <Col span={6} className="hidden">
                        <Form.Item name="id">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6} className="hidden">
                        <Form.Item name="proposalStatus">
                            <Input value={1} />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            name="proposalDate"
                            label="Ngày diễn biến"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="type"
                            label="Loại"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Select
                                className="w-full"
                                options={[
                                    {
                                        value: 1,
                                        label: "Đề xuất",
                                    },
                                    {
                                        value: 2,
                                        label: "Tham mưu",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="content"
                            label="Nội dung"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="detailedDescription"
                            label="Mô tả chi tiết"
                            rules={[
                                {
                                    required: true,
                                    message: "Không được bỏ trống trường này !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="mr-5 w-full  bg-green-700 text-white"
                                htmlType="submit"
                            >
                                Lưu
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => form.resetFields()}
                            >
                                Đặt lại
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={recoments}
                        pagination={false}
                    />
                </Col>
            </Row>
            <RecomnentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                present={present}
                setPresent={setPresent}
                employee={employee}
            />
        </>
    );
};

const RecomnentModal = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
    employee,
}) => {
    console.log(isModalOpen);
    const items = [
        {
            key: "1",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <RecomenetChildren data={data} />,
        },
    ];
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Modal
                title="BIỂU MẪU"
                centered
                open={present || isModalOpen}
                width={1300}
                onCancel={() => {
                    {
                        setIsModalOpen(false);
                        setPresent(false);
                    }
                }}
                footer={
                    <div className="text-center">
                        {present && (
                            <Button
                                key="cancel"
                                type="primary"
                                onClick={() => setOpenModal(true)}
                            >
                                Trình lãnh đạo
                            </Button>
                        )}
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                <div className="mt-10">
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        tabPosition={"left"}
                        style={{ height: 600, overflowY: "scroll" }}
                    />
                </div>
            </Modal>
            <SentLeader
                employee={employee}
                openSendLeader={openModal}
                setOpenSendLeader={setOpenModal}
            />
        </>
    );
};
const RecomenetChildren = ({ data }) => {
    const [empData, setEmpDate] = useState({});
    const handleGetEmp = async () => {
        const res = await getEmployeeById(data.employeeId);
        setEmpDate(res?.data?.data);
    };
    useEffect(() => {
        handleGetEmp();
    }, [data]);
    return (
        <div className="bg-slate-300 p-10">
            <div className="bg-white p-10">
                <Row>
                    <Col span={12} className="text-center">
                        <h3>CÔNG TY OCEAN TECH</h3>
                        <p>Số:</p>
                    </Col>
                    <Col span={12} className="text-center">
                        <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                        <b>Độc lập - Tự do - Hạnh phúc</b>
                        <p>--------------------</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="text-center mt-10">
                        <h2>QUYẾT ĐỊNH</h2>
                        <h3>Về Việc {data.note}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col
                        span={24}
                        className="flex justify-center leading-10 mt-10"
                    >
                        <div className="w-[60%]">
                            <p className="block">
                                Kính gửi: Giám đốc công ty Ocean Tech
                            </p>
                            <p className="block">
                                Tôi tên là: {empData.name} sinh ngày:{" "}
                                {/* {format(empData.dateOfBirth, "yyyy-MM-dd")} */}
                            </p>
                            <p className="block">
                                Tôi xin trình bày với nội dung sự việc như sau:
                            </p>
                            <p
                                className="block leading-[100%]"
                                style={{ borderBottom: "1px dotted #000" }}
                            >
                                {data.detailedDescription}
                            </p>
                            <p className="block">
                                Tôi xin cam đoan những thông tin mà tôi đã nêu
                                trên đây là đúng sự thật và xin chịu trách nhiệm
                                về tính chính xác, trung thực của những thông
                                tin này. Kính mong Ông/Bà xem xét và chấp nhận
                                nguyện vọng trên của tôi.
                            </p>
                            <p className="block">Tôi xin chân thành cảm ơn!</p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-10">
                    <Col span={12}></Col>
                    <Col span={12} className="text-center">
                        <div>
                            <i className="block">
                                Hà Nội, ngày ... tháng ... năm 2023
                            </i>
                            <h3>NGƯỜI LÀM ĐƠN</h3>
                            <i className="block">(Ký, ghi rõ họ tên)</i>
                            <b className="block mt-5"> {empData.name} </b>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
