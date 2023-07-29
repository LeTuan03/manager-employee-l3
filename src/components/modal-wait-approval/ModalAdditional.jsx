import { Button, Modal,Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { acceptEmployee } from "../../services/api";

export default function ModalAdditional({
    isAdditionalRequestOpen,
    setIsAdditionalRequestOpen,
    profile,
    getAllEmployee,
}) {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            profile.additionalRequest = values.additionalRequest;
            profile.submitProfileStatus = "4";
            const res = await acceptEmployee(profile);
            setIsAdditionalRequestOpen(false);
            message.success(res?.data?.message);
            await getAllEmployee();
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    const handleReset = () => {
        setIsAdditionalRequestOpen(false);
        form.resetFields();
    };
    return (
        <Modal
            title="Nội dung yêu cầu bổ sung"
            centered
            onCancel={handleReset}
            open={isAdditionalRequestOpen}
            footer={false}
        >
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    name="additionalRequest"
                    rules={[
                        {
                            required: "true",
                            message: "Nhập nội dung yêu cầu bổ sung",
                        },
                    ]}
                >
                    <TextArea
                        placeholder="Nhập nội dung"
                        autoSize={{
                            minRows: 3,
                        }}
                    />
                </Form.Item>
                <Form.Item className="text-center mt-8">
                    <Button
                        type="primary"
                        danger
                        onClick={() => setIsAdditionalRequestOpen(false)}
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
