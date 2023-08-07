import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { getAllEmployee } from "../redux/employee/employeeSlice";
import { useDispatch } from "react-redux";
const { Search } = Input;
const InputSearch = ({ status }) => {
    const dispatch = useDispatch();
    const onSearch = (value) => {
        dispatch(
            getAllEmployee({
                search: value,
                status,
            })
        );
    };
    const handleChange = (e) => {
        if (!e.target.value) {
            dispatch(
                getAllEmployee({
                    status,
                })
            );
        }
    };
    return (
        <Search
            placeholder="Tìm kiếm ..."
            allowClear
            enterButton={<SearchOutlined />}
            onSearch={onSearch}
            className="!w-[30%]"
            onChange={(e) => {
                handleChange(e);
            }}
        />
    );
};

export default InputSearch;
