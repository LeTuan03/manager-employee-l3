import React from "react";
import Menu from "./Menu";

const Sidebar = ({ collapsed }) => {
    return (
        <div className="w-[15%] bg-[#001529] fixed top-0 left-0 h-full overflow-hidden z-1 sidebar">
            <div className="p-3">
                <img
                    className="w-full my-3"
                    src={`${
                        import.meta.env.VITE_BACKEND_URL
                    }/public/image/fad65652-111d-45d9-baad-9ecb47447b74.png`}
                />
            </div>
            <Menu collapsed={collapsed}></Menu>
        </div>
    );
};

export default Sidebar;
