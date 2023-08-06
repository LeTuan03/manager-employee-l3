import { Button, Modal } from "antd";
import React, { useEffect } from "react";

const ModalDelete = ({ openDelete, setOpenDelete, ...rest }) => {
    const handleOK = () => {
        if (rest?.idDelete) {
            rest?.handleDeleteById(rest?.idDelete);
        } else if (rest?.uidDelete) {
            rest?.handleDeleteByUid(rest?.uidDelete);
            setOpenDelete(false)
        } else {
            rest?.handleDeleteEmployee(rest?.employeeIdToDelete);
        }
    };
    useEffect(()=>{
        if(!rest?.loading){
            setOpenDelete(false);
        }
    },[rest?.loading])
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
                        <Button
                            loading={rest?.loading}
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
