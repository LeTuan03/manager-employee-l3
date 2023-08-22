import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Input,
    Row,
    Select,
    Table,
    message,
} from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
    addProcessByEmp,
    deleteProcess,
    updateProcess,
} from "../../services/api";
import ModalInfo from "../modal-update-happening/ModalInfo";
import { useDispatch, useSelector } from "react-redux";
import ModalDelete from "../ModalDelete";
import {
    STATUS_EMPLOYEE,
    TYPE_UPDATEHAPPENING,
} from "../../constants/constants";
import StringStatus from "../common/StringStatus";
import ProcesPosition from "../common/ProcessPosition";
import FormUpdateHappening from "../update-happening/FormUpdateHappening";
import TextToTruncate from "../common/TextToTruncate";
import validateCodeInput from "../common/ValidateCodeInput";
import { setIsLoading } from "../../redux/employee/employeeSlice";

const { NEW_SAVE, PENDING, BEEN_APPEOVED, ADDITIONAL_REQUIREMENTS, REJECT } =
    STATUS_EMPLOYEE;

const TabProcess = ({ processs, handleGetProcessByEmp, formProcess }) => {
    const dispatch = useDispatch();
    const { open, employee } = useSelector((state) => state.employee);
    useEffect(() => {
        if (!open.modalUpdateHappening) {
            formProcess.resetFields();
        }
    }, [open.modalUpdateHappening]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState(false);

    const handleDeletePromote = async (id) => {
        try {
            dispatch(setIsLoading(true));
            await deleteProcess(id);
            message.success("Xóa thành công !");
            await handleGetProcessByEmp();
            formProcess.resetFields();
            dispatch(setIsLoading(false));
        } catch (error) {
            message.error("Xóa thất bại !");
            dispatch(setIsLoading(false));
        }
    };

    const handleSubmit = async (value) => {
        try {
            dispatch(setIsLoading(true));
            if (value.id) {
                const res = await updateProcess(value);
                setData(res?.data?.data);
                message.success("Cập nhật thành công !");
            } else {
                const res = await addProcessByEmp(employee?.id, [value]);
                setData(res?.data?.data[0]);
                message.success("Thêm mới thành công !");
            }
            await handleGetProcessByEmp();
            setIsModalOpen(true);
            dispatch(setIsLoading(false));
            formProcess.resetFields();
        } catch (error) {
            message.error("Cập nhật thất bại !");
            dispatch(setIsLoading(false));
        }
    };

    const handleEdit = (employee) => {
        employee.promotionDay = format(
            new Date(employee.promotionDay),
            "yyyy-MM-dd"
        );
        setData(employee);
        formProcess.setFieldsValue(employee);
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
            title: "Ngày thăng chức",
            dataIndex: "promotionDay",
            key: "promotionDay",
            width: 150,
            align: "center",
            render: (promotionDay) =>
                format(new Date(promotionDay), "dd/MM/yyyy"),
        },
        {
            title: "Lần thứ",
            dataIndex: "times",
            key: "times",
            width: 90,
            align: "center",
        },
        {
            title: "Chức vụ cũ",
            dataIndex: "currentPosition",
            key: "currentPosition",
            width: 140,
            align: "center",
            render: (currentPosition) => ProcesPosition(currentPosition),
        },
        {
            title: "Chức vụ hiện tại",
            dataIndex: "newPosition",
            key: "newPosition",
            width: 140,
            align: "center",
            render: (newPosition) => ProcesPosition(newPosition),
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            align: "center",
            render: (note) => (
                <p className="text-left">{TextToTruncate(note || "", 40)}</p>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "processStatus",
            key: "processStatus",
            width: 190,
            align: "center",
            render: (processStatus) => {
                return (
                    <span className="cursor-default" title={processStatus}>
                        {TextToTruncate(StringStatus(processStatus), 13)}
                    </span>
                );
            },
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            width: 130,
            align: "center",
            render: (_, employee) => (
                <div>
                    {employee.processStatus === NEW_SAVE && (
                        <div>
                            <span>
                                <EditOutlined
                                    className="text-blue-600 text-lg mr-5"
                                    onClick={() => handleEdit(employee)}
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
                        employee.processStatus
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
                        employee.processStatus
                    ) && (
                        <div>
                            <ModalInfo
                                type={
                                    employee.processStatus ===
                                    ADDITIONAL_REQUIREMENTS
                                        ? "req"
                                        : ""
                                }
                                message={employee}
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

    return (
        <>
            <Form form={formProcess} onFinish={handleSubmit} layout="vertical">
                <Row gutter={25} className="mb-2">
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
                    <Col xl={5} lg={12} md={12} sm={12} xs={12}>
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
                            <Input type="date" />
                        </Form.Item>
                    </Col>
                    <Col xl={5} lg={12} md={12} sm={12} xs={12}>
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
                                        value: 0,
                                        label: "Giám đốc",
                                    },
                                    {
                                        value: 1,
                                        label: "Trưởng phòng",
                                    },
                                    {
                                        value: 2,
                                        label: "Quản lí",
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col xl={10} lg={16} md={16} sm={16} xs={24}>
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
                    <Col xl={2} lg={3} md={3} sm={4} xs={5}>
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
                    <Col xl={2} lg={3} md={3} sm={4} xs={5}>
                        <Form.Item label=" ">
                            <Button
                                type="primary"
                                danger
                                className="w-full"
                                onClick={() => formProcess.resetFields()}
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
                                className="min-h-[200px]"
                                bordered
                                columns={columns}
                                dataSource={processs}
                                pagination={false}
                            />
                        </ConfigProvider>
                    </div>
                </Col>
            </Row>
            <FormUpdateHappening
                type={TYPE_UPDATEHAPPENING.PROCESS}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                data={data}
                handleGetProcessByEmp={handleGetProcessByEmp}
            />
            {openDelete && (
                <ModalDelete
                    openDelete={openDelete}
                    setOpenDelete={setOpenDelete}
                    employeeIdToDelete={employeeIdToDelete}
                    handleDeleteEmployee={handleDeletePromote}
                />
            )}
        </>
    );
};

export default TabProcess;
