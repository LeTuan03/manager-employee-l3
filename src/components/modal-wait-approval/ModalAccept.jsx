import React from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { format } from "date-fns";

export default function ModalAccept({
    isApproveOpen,
    setIsApproveOpen,
    onFinish,
    formAccept,
}) {
    return (
        <Modal
            title="Phê duyệt nhân viên"
            centered
            open={isApproveOpen}
            onCancel={() => setIsApproveOpen(false)}
            footer={false}
            zIndex={7}
        >
            <Form
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    remember: true,
                    acceptDay: format(new Date(), "yyyy-MM-dd"),
                }}
                form={formAccept}
            >
                <Form.Item
                    className="mt-4"
                    label=" Ngày hẹn:"
                    name="acceptDay"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn ngày",
                        },
                    ]}
                >
                    <Input
                        type="date"
                        placeholder="Chọn ngày"
                        style={{ width: "470px" }}
                    />
                </Form.Item>
                <Checkbox checked className="mt-2">
                    Đã đủ điều kiện phê duyệt
                </Checkbox>
                <Form.Item className="text-center mt-8">
                    <Button
                        className="mr-2 min-w-[100px]"
                        key="submit"
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
                            setIsApproveOpen(false);
                            formAccept.resetFields();
                        }}
                    >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
