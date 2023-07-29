import { Button, DatePicker, Modal, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { format } from "date-fns";
import React, { useState } from "react";
import { acceptEmployee } from "../services/api";

export default function ModalReject({
    isRejectOpen,
    setIsRejectOpen,
    profile,
    type,
    getAllEmployee,
}) {
    const [value, setValue] = useState("");

    const handleRejectProfile = async () => {
        //reject profile
        try {
            profile.reasonForRejection = value;
            profile.salaryIncreaseStatus = "5";
            const res = await acceptEmployee(profile);
            setIsRejectOpen(false);
            message.success(res?.data?.message);
            await getAllEmployee();
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    return (
        <Modal
            title="Nội dung từ chối"
            centered
            open={isRejectOpen}
            onOk={() => setIsRejectOpen(false)}
            onCancel={() => setIsRejectOpen(false)}
            footer={
                type === "awaiting-approval" ? (
                    <>
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsRejectOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => handleRejectProfile()}
                        >
                            Xác nhận
                        </Button>
                    </>
                ) : (
                    " "
                )
            }
        >
            Ngày từ chối *
            <Space direction="vertical" size={12} className="mt-1 mb-4">
                <DatePicker
                    placeholder="Chọn ngày"
                    style={{ width: "470px" }}
                    onChange={(e) =>
                        (profile.rejectionDate = format(
                            new Date(e.$d).getTime(),
                            "yyyy-MM-dd"
                        ))
                    }
                />
            </Space>
            Lí do:
            <TextArea
                className="mt-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập nội dung ..."
                autoSize={{
                    minRows: 3,
                }}
            />
        </Modal>
    );
}
