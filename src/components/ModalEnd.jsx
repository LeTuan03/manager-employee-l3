import { Button, Modal, Tabs} from 'antd';
import React from 'react';
import QuitJob from './QuitJob'

const ModalEnd = () => {
    const items = [
        {
            key: "1",
            label: `ĐƠN XIN NGHỈ VIỆC`,
            children: (
                <QuitJob></QuitJob>
            ),
        }
    ];
    return (
        <>
            <Modal
                width={1160}
                className="max-h-[740px] overflow-y-hidden"
                title="ĐƠN XIN NGHỈ VIỆC"
                centered
                open={false}
                // onOk={() => {
                //     setIsModalOpen(false);
                // }}
                // onCancel={() => {
                //     setIsModalOpen(false);
                // }}
                footer={
                    <div className="flex justify-center">
                        <Button
                            type="primary"
                            danger
                        // onClick={() => {
                        //     setIsModalOpen(false);
                        // }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                        // onClick={() => {
                        //     setOpenSendLeader(true);
                        // }}
                        >
                            Trình lãnh đạo
                        </Button>
                    </div>
                }
            >
                <Tabs tabPosition={"left"} defaultActiveKey="1" items={items} />
            </Modal>
        </>
    );
};

export default ModalEnd;