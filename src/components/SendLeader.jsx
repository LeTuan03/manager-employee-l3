import { Col, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Require } from "./UpdateHappeningModal";
import TextArea from "antd/es/input/TextArea";
import { getLeader } from "../services/api";

export default function SentLeader({ openModal, setOpenModal }) {
    const [leaderItem, setLeaderItem] = useState([]);
    const getLeaders = async () => {
        const res = await getLeader();
        setLeaderItem(res?.data?.data);
    };
    useEffect(() => {
        getLeaders();
    }, []);
    return (
        <Modal
            title="TRÌNH LÃNH ĐẠO"
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            width={800}
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Require /> Ngày trình
                </Col>
                <Col span={8}>
                    <Require /> Tên lãnh đạo
                </Col>
                <Col span={8}>
                    <Require /> Chức vụ
                </Col>
            </Row>
            <Row gutter={16} className="mt-2">
                <Col span={8}>
                    <Input type="date" />
                </Col>
                <Col span={8}>
                    <Select
                        className="w-full"
                        defaultValue="lucy"
                        options={[
                            {
                                value: "jack",
                                label: "Jack",
                            },
                            {
                                value: "lucy",
                                label: "Lucy",
                            },
                            {
                                value: "Yiminghe",
                                label: "yiminghe",
                            },
                        ]}
                    />
                </Col>
                <Col span={8}>
                    <Select className="w-full" options={leaderItem} />
                </Col>
            </Row>
            <Row className="mt-8">
                <Col span={24}>
                    <Require /> Nội dung
                </Col>
            </Row>
            <Row className="mt-2">
                <Col span={24}>
                    <TextArea
                        autoSize={{
                            minRows: 3,
                            maxRows: 6,
                        }}
                    />
                </Col>
            </Row>
        </Modal>
    );
}
