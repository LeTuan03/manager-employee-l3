import { Button, Checkbox, DatePicker, Modal, Space, message } from "antd";
import { format } from "date-fns";
import React from "react";
import { acceptEmployee } from "../services/api";

export default function ModalAccept({
    isApproveOpen,
    setIsApproveOpen,
    setIsModalOpen,
    profile,
    type,
}) {
    const handleAccept = async () => {
        //Duyệt nhân viên
        try {
            profile.submitProfileStatus = "3";
            const res = await acceptEmployee(profile);
            setIsApproveOpen(false);
            message.success(res?.data?.message);
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    return (
        <Modal
            title="Phê duyệt nhân viên"
            centered
            open={isApproveOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsApproveOpen(false)}
            footer={
                type === "awaiting-approval" ? (
                    <>
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsApproveOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => handleAccept()}
                        >
                            Xác nhận
                        </Button>
                    </>
                ) : (
                    " "
                )
            }
        >
            Ngày hẹn:
            <Space direction="vertical" size={12} className="mt-1 mb-4">
                <DatePicker
                    placeholder="Chọn ngày"
                    style={{ width: "470px" }}
                    onChange={(e) =>
                        (profile.terminationAppointmentDate = format(
                            e.$d,
                            "yyyy-MM-dd"
                        ))
                    }
                />
            </Space>
            <Checkbox checked>Đã đủ điều kiện phê duyệt</Checkbox>
        </Modal>
    );
}
