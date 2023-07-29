import { Button, Checkbox, DatePicker,Form, Modal, Space, message } from "antd";
import { format } from "date-fns";
import React from "react";
import { acceptEmployee } from "../../services/api";


export default function ModalAccept({
    isApproveOpen,
    setIsApproveOpen,
    profile,
    getAllEmployee,
}) {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            profile.submitProfileStatus = "3";
            profile.terminationAppointmentDate = format(
                new Date(values.terminationAppointmentDate.$d).getTime(),
                "yyyy-MM-dd"
            );
            const res = await acceptEmployee(profile);
            setIsApproveOpen(false);
            message.success(res?.data?.message);
            await getAllEmployee();
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    const handleReset = () => {
        setIsApproveOpen(false);
        form.resetFields();
    };
    return (
        <Modal
            title="Phê duyệt nhân viên"
            centered
            open={isApproveOpen}
            onCancel={handleReset}
            footer={false}
        >
            <Form onFinish={onFinish} layout="vertical" form={form}>
                <Form.Item
                    className="mt-5"
                    label="Ngày hẹn:"
                    name={"terminationAppointmentDate"}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày",
                        },
                    ]}
                >
                    <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                    />
                </Form.Item>
                <Checkbox checked>Đã đủ điều kiện phê duyệt</Checkbox>

                <Form.Item className="text-center mt-8">
                    <Button
                        key="cancel"
                        type="primary"
                        danger
                        onClick={() => setIsApproveOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button className="ml-2" htmlType="submit" type="primary">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
