import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    Col,
    Form,
    Input,
    Row,
    Table,
    Button,
    message,
    ConfigProvider,
} from "antd";
import { addSalaryByEmp, deleteSalary, updateSalary } from "../../services/api";
import SalaryModal from "./SalaryModal";
import ModalInfo from "../modal-update-happening/ModalInfo";
import TextToTruncate from "../../hook/TextToTruncate";
import validateCodeInput from "../../hook/ValidateCodeInput";
import { STATUS, STATUS_EMPLOYEE } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import NumberStatus from "../common/NumberStatus";
import { getEmployee } from "../../redux/employee/employeeSlice";

const TabIncreaseSalary = ({ salary, handleGetSalaryByEmp }) => {
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    useEffect(() => {
        if (!open.modalUpdateHappening) {
            form.resetFields();
        }
    }, [open.modalUpdateHappening]);
    console.log(employee);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldMoney, setOldMoney] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(false);

    const handleDelete = async (value) => {
        try {
            setLoading(true);
            await deleteSalary(value);
            message.success("Xóa thành công!");
            form.resetFields();
            handleGetSalaryByEmp();
            setLoading(false);
        } catch (error) {
            message.error("Xóa thất bại!");
            console.log(error);
        }
    };

    const handleSubmit = async (value) => {
        try {
            if (value.id) {
                const res = await updateSalary(value);
                if (res?.data?.code === STATUS.SUCCESS) {
                    message.success("Cập nhật thành công!");
                    setData(res?.data?.data);
                    await handleGetSalaryByEmp();
                    setIsModalOpen(true);
                } else {
                    message.error(res?.data?.message);
                }
            } else {
                if (
                    [
                        STATUS_EMPLOYEE.REJECT_REQUEST_END_PROFILE,
                        STATUS_EMPLOYEE.ADDITIONAL_REQUIREMENTS_END_PROFILE,
                    ].includes(employee.submitProfileStatus)
                ) {
                    message.error(
                        "Không thể thêm thông tin lương cho nhân viên này"
                    );
                } else {
                    const res = await addSalaryByEmp(employee.id, [value]);
                    if (res?.data?.code === STATUS.SUCCESS) {
                        message.success("Thêm mới thành công!");
                        setData(res?.data?.data[0]);
                        await handleGetSalaryByEmp();
                        setIsModalOpen(true);
                    } else {
                        message.error(res?.data?.message);
                    }
                }
            }
            form.resetFields();
        } catch (error) {
            console.log(error);
            message.error("Cập nhật thất bại!");
        }
    };

    const handleEdit = (employee) => {
        employee.startDate = format(new Date(employee.startDate), "yyyy-MM-dd");
        setData(employee);
        form.setFieldsValue(employee);
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 60,
            align: "center",
            render: (_, item, index) => <b>{index + 1}</b>,
        },
        {
            title: "Ngày tăng lương",
            dataIndex: "startDate",
            key: "startDate",
            width: 150,
            align: "center",
            render: (text) => format(new Date(text), "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Lương cũ",
            dataIndex: "oldSalary",
            key: "oldSalary",
            width: 130,
            align: "center",
        },
        {
            title: "Lương mới",
            dataIndex: "newSalary",
            key: "newSalary",
            width: 130,
            align: "center",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            align: "center",
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 25)}</p>
            ),
        },
        {
            title: "Lý do",
            dataIndex: "reason",
            key: "reason",
            align: "center",
            render: (reason) => (
                <p className="text-left">{TextToTruncate(reason || "", 25)}</p>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "salaryIncreaseStatus",
            key: "salaryIncreaseStatus",
            width: 130,
            align: "center",
            render: (salaryIncreaseStatus) =>
                TextToTruncate(NumberStatus(salaryIncreaseStatus) || "", 13),
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 130,
            align: "center",
            render: (_, employee) => (
                <div>
                    {employee.salaryIncreaseStatus === 1 && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        handleEdit(employee);
                                        dispatch(
                                            getEmployee(employee.employeeId)
                                        );
                                    }}
                                />
                            </span>
                            <span>
                                <DeleteOutlined
                                    className="text-red-600 text-lg"
                                    onClick={() => {
                                        setEmployeeIdToDelete(employee.id);
                                        setOpenDelete(true);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    {[2, 3].includes(employee.salaryIncreaseStatus) && (
                        <div>
                            <EyeOutlined
                                className="text-green-600 text-lg"
                                onClick={() => {
                                    setData(employee);
                                    setIsModalOpen(true);
                                }}
                            />
                        </div>
                    )}
                    {[4, 5].includes(employee.salaryIncreaseStatus) && (
                        <div>
                            <ModalInfo
                                message={employee}
                                type={
                                    employee.salaryIncreaseStatus === 4
                                        ? "req"
                                        : ""
                                }
                            />
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg"
                                    onClick={() => handleEdit(employee)}
                                />
                            </span>
                        </div>
                    )}
                </div>
            ),
        },
    ];
    const validateNewMoney = (_, values) => {
        if (values) {
            if (+values < +oldMoney) {
                return Promise.reject(
                    new Error("Lương mới phải cao hơn lương cũ.")
                );
            } else {
                return Promise.resolve();
            }
        } else {
            return Promise.reject(new Error(`Không được để trống trường này!`));
        }
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
                            <Input type="date" />
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
                            <Input
                                type="number"
                                suffix="VND"
                                onChange={(e) => setOldMoney(e.target.value)}
                                value={oldMoney}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="newSalary"
                            label="Lương mới"
                            rules={[
                                {
                                    validator: validateNewMoney,
                                },
                            ]}
                        >
                            <Input type="number" suffix="VND" />
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
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            name="reason"
                            label="Lý do"
                            rules={[
                                {
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={240} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={2}>
                        <Form.Item label=" ">
                            <Button
                                className="w-full"
                                type="primary"
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
                    <div className="main-table">
                        <ConfigProvider renderEmpty={() => <></>}>
                            <Table
                                className="min-h-[100px]"
                                bordered
                                columns={columns}
                                dataSource={salary}
                                pagination={false}
                            />
                        </ConfigProvider>
                    </div>
                </Col>
            </Row>
            <SalaryModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                employee={employee}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
            />
            <ModalDelete
                loading={loading}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                employeeIdToDelete={employeeIdToDelete}
                handleDeleteEmployee={handleDelete}
            />
        </>
    );
};
export default TabIncreaseSalary;
