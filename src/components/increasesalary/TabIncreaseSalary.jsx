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
import ModalInfo from "../modal-update-happening/ModalInfo";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import NumberStatus from "../common/NumberStatus";
import TextToTruncate from "../common/TextToTruncate";

import FormUpdateHappening from "../update-happening/FormUpdateHappening";
import { setIsLoading } from "../../redux/employee/employeeSlice";
import { STATUS_EMPLOYEE_NUMBER } from "../../constants/constants";
import { validateCodeInput } from "../common/Validate";

const TabIncreaseSalary = ({ salary, handleGetSalaryByEmp, formSalary }) => {
    const {
        NEW_SAVE,
        PENDING,
        BEEN_APPEOVED,
        ADDITIONAL_REQUIREMENTS,
        REJECT,
    } = STATUS_EMPLOYEE_NUMBER;
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    useEffect(() => {
        if (!open.modalUpdateHappening) {
            formSalary.resetFields();
        }
    }, [open.modalUpdateHappening]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldMoney, setOldMoney] = useState("");
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);

    const handleDelete = async () => {
        try {
            dispatch(setIsLoading(true));
            await deleteSalary(employeeIdToDelete);
            message.success("Xóa thành công!");
            formSalary.resetFields();
            setEmployeeIdToDelete(null);
            handleGetSalaryByEmp();
            dispatch(setIsLoading(false));
        } catch (error) {
            dispatch(setIsLoading(false));
            message.error("Xóa thất bại!");
        }
    };

    const handleSubmit = async (value) => {
        try {
            dispatch(setIsLoading(true));
            if (value.id) {
                const res = await updateSalary(value);
                message.success("Cập nhật thành công!");
                setData(res?.data?.data);
                await handleGetSalaryByEmp();
            } else {
                const res = await addSalaryByEmp(employee.id, [value]);
                message.success("Thêm mới thành công!");
                setData(res?.data?.data[0]);
                await handleGetSalaryByEmp();
            }
            setIsModalOpen(true);
            formSalary.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            dispatch(setIsLoading(false));
            message.error("Cập nhật thất bại!");
        }
    };

    const handleEdit = (employee) => {
        employee.startDate = format(new Date(employee.startDate), "yyyy-MM-dd");
        setData(employee);
        formSalary.setFieldsValue(employee);
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
                    {employee.salaryIncreaseStatus === NEW_SAVE && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => {
                                        handleEdit(employee);
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
                    {[PENDING, BEEN_APPEOVED].includes(
                        employee.salaryIncreaseStatus
                    ) && (
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
                    {[ADDITIONAL_REQUIREMENTS, REJECT].includes(
                        employee.salaryIncreaseStatus
                    ) && (
                        <div>
                            <ModalInfo
                                message={employee}
                                type={
                                    employee.salaryIncreaseStatus ===
                                    ADDITIONAL_REQUIREMENTS
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
            <Form form={formSalary} onFinish={handleSubmit} layout="vertical">
                <Row gutter={25} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"id"}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={25} className="hidden">
                    <Col span={8}>
                        <Form.Item name={"salaryIncreaseStatus"}>
                            <Input value={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={25}>
                    <Col span={8} xl={8} lg={12} xs={24} sm={12} md={12}>
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
                    <Col span={8} xl={8} lg={12} xs={24} sm={12} md={12}>
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
                    <Col span={8} xl={8} lg={12} xs={24} sm={12} md={12}>
                        <Form.Item
                            name="newSalary"
                            label="Lương mới"
                            rules={[
                                { required: true, validator: validateNewMoney },
                            ]}
                        >
                            <Input type="number" suffix="VND" />
                        </Form.Item>
                    </Col>

                    <Col span={9} xl={8} lg={12} xs={24} sm={12} md={12}>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                            rules={[
                                {
                                    required: true,
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={100} showCount />
                        </Form.Item>
                    </Col>
                    <Col span={11} lg={12} xs={24} sm={12} md={12}>
                        <Form.Item
                            name="reason"
                            label="Lý do"
                            rules={[
                                {
                                    required: true,
                                    validator: validateCodeInput,
                                },
                            ]}
                        >
                            <Input maxLength={240} showCount />
                        </Form.Item>
                    </Col>
                    <Col xs={6} sm={4} md={4} xl={2} lg={4}>
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
                    <Col xs={6} sm={4} md={4} xl={2} lg={4}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => formSalary.resetFields()}
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
            <FormUpdateHappening
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                handleGetSalaryByEmp={handleGetSalaryByEmp}
            />
            {openDelete && (
                <ModalDelete
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    handleDelete={handleDelete}
                />
            )}
        </>
    );
};
export default TabIncreaseSalary;
