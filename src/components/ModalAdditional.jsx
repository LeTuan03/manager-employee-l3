import { Button, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { acceptEmployee } from "../services/api";

export default function ModalAdditional({
    isAdditionalRequestOpen,
    setIsAdditionalRequestOpen,
    profile,
    type,
}) {
    const additionalRequestTermination = async () => {
        //Thêm nội dung yêu cầu bổ sung
        try {
            profile.submitProfileStatus = "4";
            const res = await acceptEmployee(profile);
            setIsAdditionalRequestOpen(false);
            message.success(res?.data?.message);
        } catch (error) {
            console.log(error);
            message.error(error);
        }
    };
    return (
        <Modal
            title="Nội dung yêu cầu bổ sung"
            centered
            open={isAdditionalRequestOpen}
            onOk={() => setIsAdditionalRequestOpen(true)}
            onCancel={() => setIsAdditionalRequestOpen(false)}
            footer={
                type === "awaiting-approval" && (
                    <>
                        <Button
                            key="cancel"
                            type="primary"
                            danger
                            onClick={() => setIsAdditionalRequestOpen(false)}
                        >
                            Hủy
                        </Button>
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() => {
                                additionalRequestTermination();
                            }}
                        >
                            Xác nhận
                        </Button>
                    </>
                )
            }
        >
            <TextArea
                onChange={(e) => (profile.additionalRequest = e.target.value)}
                placeholder="Nhập nội dung"
                autoSize={{
                    minRows: 3,
                }}
            />
        </Modal>
    );
}
