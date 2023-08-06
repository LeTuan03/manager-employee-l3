import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FrownOutlined } from "@ant-design/icons";
export default function ModalInfo({ message, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(message);
    return (
        <>
            <span>
                <FrownOutlined
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
                    <div className="text-center">
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
