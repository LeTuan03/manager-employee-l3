import { Button, Modal } from "antd";
import React from "react";

const ModalDelete = ({ openDelete, setOpenDelete,handleDelete }) => {
    const handleOK = () => {
        handleDelete&&handleDelete()
        setOpenDelete(false);
    };
    return (
        <Modal
            title="Xóa bản ghi"
            centered
            open={openDelete}
            onOk={() => {
                handleOK();
            }}
            onCancel={() => setOpenDelete(false)}
            footer={
                <>
                    <div className="flex justify-center pb-5 mt-6">
                        <Button
                            type="primary"
                            onClick={() => {
                                handleOK();
                            }}
                        >
                            Xác nhận
                        </Button>
                        <Button
                            onClick={() => setOpenDelete(false)}
                            type="primary"
                            danger
                            className="min-w-[100px]"
                        >
                            Hủy
                        </Button>
                    </div>
                </>
            }
        >
            <span>Bạn có chắc muốn xóa bản ghi này!</span>
        </Modal>
    );
};

export default ModalDelete;
