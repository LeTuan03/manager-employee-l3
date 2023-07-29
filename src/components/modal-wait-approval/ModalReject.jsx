import { Button, DatePicker,Form, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import React from "react";
import { acceptEmployee } from "../../services/api";

export default function ModalReject({
    isRejectOpen,
    setIsRejectOpen,
    profile,
    getAllEmployee,
}) {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            profile.reasonForRejection = values.reasonForRejection;
            profile.rejectionDate = format(
                new Date(values.rejectionDate.$d).getTime(),
                "yyyy-MM-dd"
            );
            profile.salaryIncreaseStatus = "5";
            const res = await acceptEmployee(profile);
            message.success(res?.data?.message);
            await getAllEmployee();
            setIsRejectOpen(false);
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    const handleReset = () => {
        setIsRejectOpen(false);
        form.resetFields();
    };
    return (
        <Modal
            title="Nội dung từ chối"
            centered
            open={isRejectOpen}
            onCancel={handleReset}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Ngày từ chối"
                    name="rejectionDate"
                    rules={[
                        {
                            required: true,
                            message: "Yêu cầu chọn ngày từ chối",
                        },
                    ]}
                >
                    <DatePicker
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                    />
                </Form.Item>

                <Form.Item
                    name="reasonForRejection"
                    label="Lí do:"
                    rules={[
                        {
                            required: true,
                            message: "Yêu cầu nhập nội dung từ chối",
                        },
                    ]}
                >
                    <TextArea
                        className="mt-1"
                        placeholder="Nhập nội dung ..."
                        autoSize={{
                            minRows: 3,
                        }}
                    />
                </Form.Item>
                <Form.Item className="text-center mt-8">
                    <Button
                        type="primary"
                        danger
                        onClick={() => setIsRejectOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button htmlType="submit" type="primary" className="ml-2">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
