import { Col, Row } from "antd";
import { format } from "date-fns";

export default function Conclusion(date, name) {
    return (
        <div className="mt-10">
            <Row>
                <Col flex={3} className="text-center"></Col>
                <Col flex={2} className="text-center">
                    <i className="!text-lg">
                        Hà Nội, ngày {date && format(new Date(date), "dd")}{" "}
                        tháng {date && format(new Date(date), "MM")} năm{" "}
                        {date && format(new Date(date), "yyyy")}
                    </i>
                    <h3>NGƯỜI LÀM ĐƠN</h3>
                    <i>(Ký, ghi rõ họ tên)</i>

                    <b className="block mt-5">{name}</b>
                </Col>
            </Row>
        </div>
    );
}
