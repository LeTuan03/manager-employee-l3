import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import React from "react";

export default function ModalReject({
    isRejectOpen,
    setIsRejectOpen,
    form2,
    onFinishReject,
}) {
    return (
        <Modal
            title="Nội dung từ chối"
            centered
            open={isRejectOpen}
            onCancel={() => {
                setIsRejectOpen(false);
                form2.resetFields();
            }}
            footer={false}
            zIndex={7}
        >
            <Form
                layout="vertical"
                onFinish={onFinishReject}
                initialValues={{
                    remember: true,
                    rejectionDate: format(new Date(), "yyyy-MM-dd"),
                }}
                form={form2}
            >
                <Form.Item
                    name="rejectionDate"
                    label="Ngày từ chối"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                        type="date"
                    />
                </Form.Item>
                <Form.Item
                    label="Lí do"
                    name="reasonForRejection"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập nội dung!",
                        },
                    ]}
                >
                    <TextArea
                        className="mt-1"
                        placeholder="Nhập nội dung ..."
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
                        key="submit"
                        type="primary"
                        htmlType="submit"
                    >
                        Xác nhận
                    </Button>
                    <Button
                        className="min-w-[100px]"
                        key="cancel"
                        type="primary"
                        danger
                        onClick={() => {
                            setIsRejectOpen(false);
                            form2.resetFields();
                        }}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
