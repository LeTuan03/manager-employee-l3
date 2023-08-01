import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FrownOutlined } from "@ant-design/icons";
export default function ModalInfo({ message, type }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <span>
                <FrownOutlined
                    className="text-orange-500 text-lg"
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
                        <Button type="primary" danger>
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