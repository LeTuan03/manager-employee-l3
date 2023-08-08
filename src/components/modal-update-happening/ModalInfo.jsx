import React, { useState } from "react";
import { Button, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
export default function ModalInfo({ message, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <span>
                <InfoCircleOutlined
                    className="text-orange-500 text-lg mr-5"
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                />
            </span>
            <Modal
                centered
                title={type === "req" ? "YÊU CẦU BỔ SUNG" : "LÝ DO TỪ CHỐI"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <div className="text-center pb-5">
                        <Button
                            type="primary"
                            danger
                            onClick={() => setIsModalOpen(false)}
                        >
                            Hủy
                        </Button>
                    </div>
                }
            >
                {type === "req"
                    ? message?.additionalRequest
                    : message?.reasonForRefusal}
            </Modal>
        </>
    );
}
