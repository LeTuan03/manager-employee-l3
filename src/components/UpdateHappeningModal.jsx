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
            children: <TabIncreaseSalary salary={salary} />,
        },
        {
            key: "2",
            label: `THĂNG CHỨC`,
            children: <TabProcess processs={processs} />,
        },
        {
            key: "3",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <TabRecommendation recoments={recoments} />,
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
                                    <Input value={employee.dateOfBirth} />
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

const TabIncreaseSalary = ({ salary }) => {
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
                                        setSalaryObj(employee);
                                        salaryObj.startDate = format(
                                            new Date(
                                                employee.startDate
                                            ).getTime(),
                                            "yyyy/MM/dd"
                                        );
                                        console.log(salaryObj);
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() =>
                                        handleDeleteSalary(employee.id)
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
                            <TabSalary
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                data={data}
                                present={present}
                                setPresent={setPresent}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [data, setData] = useState({});

    const [salaryObj, setSalaryObj] = useState({
        newSalary: "",
        note: "",
        oldSalary: "",
        reason: "",
        salaryIncreaseStatus: 1,
        startDate: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSalaryObj((preState) => ({ ...preState, [name]: value }));
    };
    const handleSubmit = async () => {
        if (salaryObj.id) {
            salaryObj.startDate = new Date(salaryObj.startDate).getTime();
            const res = await updateSalary(salaryObj);
        } else {
            const res = await addSalaryByEmp(salary[0].employeeId, [salaryObj]);
        }
        setIsModalOpen(true);
        setPresent(true);
    };
    const handleDeleteSalary = async (id) => {
        const res = await deleteSalary(id);
    };
    return (
        <form>
            <Row gutter={16} className="mb-2">
                <Col span={8}>
                    <Require /> Ngày tăng lương
                </Col>
                <Col span={8}>
                    <Require /> Lương cũ
                </Col>
                <Col span={8}>
                    <Require /> Lương mới
                </Col>
            </Row>
            <Row gutter={16} className="mb-4">
                <Col span={8}>
                    <Input
                        name="startDate"
                        value={salaryObj.startDate}
                        // value={format(salaryObj.startDate, "yyyy/MM/dd")}
                        type="date"
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        name="oldSalary"
                        value={salaryObj.oldSalary}
                        type="number"
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        name="newSalary"
                        value={salaryObj.newSalary}
                        type="number"
                        onChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row gutter={16} className="mb-2">
                <Col span={9}>
                    <Require /> Ghi chú
                </Col>
                <Col span={9}>
                    <Require /> Lý do
                </Col>
            </Row>
            <Row gutter={16} className="mb-2">
                <Col span={9}>
                    <Input
                        name="note"
                        value={salaryObj.note}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={9}>
                    <Input
                        name="reason"
                        value={salaryObj.reason}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={6}>
                    <Button
                        className="mr-5 w-[40%] bg-green-700 text-white"
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="w-[40%]"
                        onClick={() => {
                            setSalaryObj({
                                newSalary: "",
                                note: "",
                                oldSalary: "",
                                reason: "",
                                salaryIncreaseStatus: 1,
                                startDate: "",
                            });
                        }}
                    >
                        Đặt lại
                    </Button>
                </Col>
            </Row>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={salary}
                        pagination={false}
                    />
                </Col>
            </Row>
        </form>
    );
};

const TabSalary = ({
    isModalOpen,
    setIsModalOpen,
    data,
    present,
    setPresent,
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
                open={isModalOpen}
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
            <SentLeader openModal={openModal} setOpenModal={setOpenModal} />
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

const TabProcess = ({ processs }) => {
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
                <>{format(new Date(promotionDay).getTime(), "yyyy-MM-dd")}</>
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
                                        setProcess(employee);
                                        process.promotionDay = format(
                                            new Date(employee.promotionDay)
                                                .getTime,
                                            "yyyy-MM-dd"
                                        );
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
                            <ProcessModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                data={data}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});

    const [process, setProcess] = useState({
        newPosition: "",
        promotionDay: "",
        note: "",
        processStatus: 1,
    });
    const handleInputChange = (event) => {
        if (event.target) {
            const { name, value } = event.target;
            setProcess((preState) => ({ ...preState, [name]: value }));
        } else {
            setProcess((preState) => ({ ...preState, newPosition: +event }));
        }
    };
    const handleSubmit = async () => {
        if (process.id) {
            process.promotionDay = new Date(process.promotionDay).getTime();
            const res = await updateProcess(process);
        } else {
            const res = await addProcessByEmp(processs[0].employeeId, [
                process,
            ]);
        }
    };

    const handleDeletePromote = async (id) => {
        const res = await deleteProcess(id);
    };

    return (
        <>
            <Form name="form">
                <Row gutter={16} className="mb-2">
                    <Col span={4}>
                        <Require /> Ngày thăng chức
                    </Col>
                    <Col span={4}>
                        <Require /> Chức vụ mới
                    </Col>
                    <Col span={8}>
                        <Require /> Ghi chú
                    </Col>
                </Row>
                <Row gutter={16} className="mb-2">
                    <Col span={4}>
                        <Input
                            value={process.promotionDay}
                            name="promotionDay"
                            type="date"
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col span={4}>
                        <Select
                            onChange={handleInputChange}
                            value={
                                process.newPosition === 1
                                    ? "Trưởng phòng"
                                    : process.newPosition === 0
                                    ? "Giám đốc"
                                    : "Quản lí"
                            }
                            className="w-full"
                            options={[
                                {
                                    value: "0",
                                    label: "Giám đốc",
                                },
                                {
                                    value: "1",
                                    label: "Trưởng phòng",
                                },
                                {
                                    value: "3",
                                    label: "Quản lí",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <Input
                            name="note"
                            value={process.note}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col span={4}>
                        <Button
                            className="mr-5 w-[40%] bg-green-700 text-white"
                            onClick={handleSubmit}
                        >
                            Lưu
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="w-[40%]"
                            onClick={() =>
                                setProcess({
                                    newPosition: "",
                                    promotionDay: "",
                                    note: "",
                                    processStatus: 1,
                                })
                            }
                        >
                            Đặt lại
                        </Button>
                    </Col>
                </Row>
                <Form.Item
                    label="Normal label"
                    name="username"
                    rules={[
                        { required: true, message: "Không được để trống !" },
                    ]}
                >
                    <Input
                        value={process.promotionDay}
                        name="promotionDay"
                        type="date"
                        onChange={handleInputChange}
                    />
                </Form.Item>
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
        </>
    );
};

const ProcessModal = ({ isModalOpen, setIsModalOpen, data }) => {
    const items = [
        {
            key: "1",
            label: `THĂNG CHỨC`,
            children: <ProcessChildren data={data} />,
        },
    ];

    return (
        <Modal
            title="BIỂU MẪU"
            centered
            open={isModalOpen}
            width={1300}
            onCancel={() => setIsModalOpen(false)}
            footer={
                <div className="text-center">
                    {" "}
                    <Button
                        key="cancel"
                        type="primary"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Trình lãnh đạo
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
            <div className="mt-10">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    tabPosition={"left"}
                    style={{ height: 600, overflowY: "scroll" }}
                />
            </div>
        </Modal>
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
                            {format(data.promotionDay, "yyyy-MM-dd")}.
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

const TabRecommendation = ({ recoments }) => {
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
                <>{format(new Date(proposalDate).getTime(), "yyyy-MM-dd")}</>
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
                                        setrecoment(employee);
                                        recoment.proposalDate = format(
                                            employee.proposalDate,
                                            "yyyy-MM-dd"
                                        );
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
                            <RecomnentModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                data={data}
                            />
                        </div>
                    )}
                </div>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});

    const [recoment, setrecoment] = useState({
        proposalDate: "",
        content: "",
        note: "",
        type: "",
        detailedDescription: "",
    });
    const handleInputChange = (event) => {
        if (event.target) {
            const { name, value } = event.target;
            setrecoment((preState) => ({ ...preState, [name]: value }));
        } else {
            setrecoment((preState) => ({ ...preState, type: +event }));
        }
    };
    const handleSubmit = async () => {
        if (recoment.id) {
            const res = await updateProposal(recoment);
        } else {
            const res = await addProcessByEmp(recoments[0].employeeId, [
                recoment,
            ]);
        }
    };

    const handleDeleteRecoment = async (id) => {
        const res = await deleteProposal(id);
    };

    return (
        <form>
            <Row gutter={16} className="mb-2">
                <Col span={6}>
                    <Require /> Ngày diễn biến
                </Col>
                <Col span={6}>
                    <Require /> Loại
                </Col>
                <Col span={12}>
                    <Require /> Ghi chú
                </Col>
            </Row>
            <Row gutter={16} className="mb-2">
                <Col span={6}>
                    <Input
                        name="proposalDate"
                        value={recoment.proposalDate}
                        type="date"
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={6}>
                    <Select
                        onChange={handleInputChange}
                        value={recoment.type === 1 ? "Đề xuất" : "Tham mưu"}
                        className="w-full"
                        options={[
                            {
                                value: "1",
                                label: "Đề xuất",
                            },
                            {
                                value: "2",
                                label: "Tham mưu",
                            },
                        ]}
                    />
                </Col>
                <Col span={12}>
                    <Input
                        name="note"
                        value={recoment.note}
                        onChange={handleInputChange}
                    />
                </Col>
            </Row>
            <Row gutter={16} className="mb-2">
                <Col span={10}>
                    <Require /> Nội dung
                </Col>
                <Col span={10}>
                    <Require /> Mô tả chi tiết
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={10}>
                    <Input
                        name="content"
                        value={recoment.content}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={10}>
                    <Input
                        name="detailedDescription"
                        value={recoment.detailedDescription}
                        onChange={handleInputChange}
                    />
                </Col>
                <Col span={4}>
                    <Button
                        className="mr-5 w-[40%] bg-green-700 text-white"
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="w-[40%]"
                        onClick={() =>
                            setrecoment({
                                proposalDate: "",
                                content: "",
                                note: "",
                                type: "",
                                detailedDescription: "",
                            })
                        }
                    >
                        Đặt lại
                    </Button>
                </Col>
            </Row>
            <Row className="mt-8">
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={recoments}
                        pagination={false}
                    />
                </Col>
            </Row>
        </form>
    );
};

const RecomnentModal = ({ isModalOpen, setIsModalOpen, data }) => {
    const items = [
        {
            key: "1",
            label: `ĐỀ XUẤT/THAM MƯU`,
            children: <RecomenetChildren data={data} />,
        },
    ];

    return (
        <Modal
            title="BIỂU MẪU"
            centered
            open={isModalOpen}
            width={1300}
            onCancel={() => setIsModalOpen(false)}
            footer={
                <div className="text-center">
                    <Button
                        key="cancel"
                        type="primary"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Trình lãnh đạo
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
            <div className="mt-10">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    tabPosition={"left"}
                    style={{ height: 600, overflowY: "scroll" }}
                />
            </div>
        </Modal>
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
export const Require = () => {
    return (
        <span className="text-red-500">
            <b>*</b>
        </span>
    );
};
