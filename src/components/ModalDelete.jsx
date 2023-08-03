import { Button, Modal } from "antd";
import React from "react";

const ModalDelete = ({ openDelete, setOpenDelete, ...rest }) => {
    const handleOK = () => {
        setOpenDelete(false);
        if (rest?.idDelete) {
            rest?.handleDeleteById(rest?.idDelete);
        } else if (rest?.uidDelete) {
            rest?.handleDeleteByUid(rest?.uidDelete);
        } else {
            rest?.handleDeleteEmployee(rest?.employeeIdToDelete);
        }
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
                    <div className="flex justify-center">
                        <Button onClick={() => setOpenDelete(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                handleOK();
                            }}
                        >
                            Xác nhận
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