import { Button, DatePicker, Modal, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { getEmployeeById, submitAndSaveResume } from "../services/api";

export default function SaveResume({
    isResumeOpen,
    setIsResumeOpen,
    employeeId,
    setIsOpenResume,
}) {
    const [profile, setProfile] = useState({});
    const handleGetProfile = async () => {
        const res = await getEmployeeById(employeeId);
        setProfile(res?.data?.data);
    };
    useEffect(() => {
        handleGetProfile();
        if (profile.submitProfileStatus === "7") {
            setIsOpenResume(true);
        } else {
            setIsOpenResume(false);
        }
    }, [employeeId]);

    const handleDecisionDay = async () => {
        try {
            profile.submitProfileStatus = "0";
            const res = await submitAndSaveResume(profile);
            message.success("Nộp lưu hồ sơ thành công!");
        } catch (error) {
            message.error("Nộp lưu hồ sơ thất bại!");
        }
    };
    return (
        <Modal
            title="NỘP LƯU HỒ SƠ"
            centered
            open={isResumeOpen}
            onCancel={() => setIsResumeOpen(false)}
            footer={
                <>
                    <Button
                        key="cancel"
                        type="primary"
                        danger
                        onClick={() => setIsResumeOpen(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => handleDecisionDay()}
                    >
                        Xác nhận
                    </Button>
                </>
            }
        >
            Ngày quyết định *
            <Space direction="vertical" size={12} className="mt-1 mb-4">
                <DatePicker
                    placeholder="Chọn ngày"
                    style={{ width: "470px" }}
                    onChange={(e) =>
                        (profile.decisionDay = new Date(e.$d).toISOString())
                    }
                />
            </Space>
            Số lưu:
            <TextArea
                className="mt-1"
                onChange={(e) => (profile.numberSaved = e.target.value)}
                autoSize={{
                    maxRows: 1,
                }}
            />
        </Modal>
    );
}
