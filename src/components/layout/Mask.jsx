import { Spin } from "antd";
import React from "react";

export default function Mask() {
    return (
        <div className="fixed w-full h-full z-50 bg-[#2d282870] top-0 items-center flex justify-center">
            <Spin size="large" />
        </div>
    );
}
