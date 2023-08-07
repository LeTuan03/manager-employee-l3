import React from "react";
import { Col, Row } from "antd";

const CommonHeader = ({ company, profile }) => {
    return (
        <Row>
            <Col flex={2} className="text-center">
                <h3>{company}</h3>
                <p>Số: {profile?.employeeId || profile?.id}</p>
            </Col>
            <Col flex={3} className="text-center">
                <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                <h4>Độc lập - Tự do - Hạnh phúc</h4>
                ----------------------------
            </Col>
        </Row>
    );
};

export default CommonHeader;
