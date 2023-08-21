import { Button, Modal, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export default function ModalAdditional({
    isAdditionalRequestOpen,
    setIsAdditionalRequestOpen,
    form,
    onFinishAdditional,
}) {
    return (
        <Modal
            title="Nội dung yêu cầu bổ sung"
            centered
            open={isAdditionalRequestOpen}
            onCancel={() => {
                setIsAdditionalRequestOpen(false);
                form.resetFields();
            }}
            zIndex={7}
            footer={false}
        >
            <Form onFinish={onFinishAdditional} layout="vertical" form={form}>
                <Form.Item
                    name="additionalRequest"
                    label="Nội dung yêu cầu bổ sung:"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập nội dung!",
                        },
                    ]}
                >
                    <TextArea
                        required
                        autoSize={{
                            minRows: 3,
                            maxRows: 10,
                        }}
                        maxLength={240}
                        showCount
                    />
                </Form.Item>
                <Form.Item className="text-center mt-8">
                    <Button
                        className="min-w-[100px] mr-2"
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                    <Button
                        className="min-w-[100px]"
                        type="primary"
                        danger
                        onClick={() => {
                            setIsAdditionalRequestOpen(false);
                            form.resetFields();
                        }}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
