import React from "react";
import Menu from "./Menu";

const Sidebar = () => {
    return (
        <div className=" w-[15%] bg-[rgba(34,_42,_69,_0.96)] fixed top-0 left-0 h-full">
            <img
                className="w-52 pt-3 px-1"
                src={`${
                    import.meta.env.VITE_BACKEND_URL
                }/public/image/fad65652-111d-45d9-baad-9ecb47447b74.png`}
            />
            <Menu></Menu>
        </div>
    );
};

export default Sidebar;
