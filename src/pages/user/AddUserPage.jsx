import React, { useState } from 'react';
import Employyee from '../manager/Employee'
import TabAddEmployee from './TabAddEmployee'
import TabAddCertificate from './TabAddCertificate'
import TabAddFamily from './TabAddFamily'
import { Form, Modal, Tabs } from 'antd';
const AddUserPage = () => {
    const [form] = Form.useForm();
    const [open,setOpen]=useState(true)
    const items = [
        {
            key: "1",
            label: `THÔNG TIN NHÂN VIÊN`,
            children: <TabAddEmployee></TabAddEmployee>
        },
        {
            key: "2",
            label: `QUAN HỆ GIA ĐÌNH`,
            children: <TabAddFamily></TabAddFamily>,
        },
        {
            key: "3",
            label: `THÔNG TIN VĂN BẰNG`,
            children: <TabAddCertificate></TabAddCertificate>,
        },
    ];
    return (
        <>
            <Modal
                title="THÊM THÔNG TIN NHÂN VIÊN"
                open={open}
                centered
                width={1000}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                okText={"Sửa"}
                cancelText={"Hủy"}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
            <Employyee></Employyee>
        </>
    );
};

export default AddUserPage;