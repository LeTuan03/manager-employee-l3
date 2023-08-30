import { Tag } from "antd";
import { TEAM } from "../../constants/constants";

const TeamStatus = (status) => {
    let color, is;
    switch (status) {
        case TEAM.BE:
            color = "geekblue";
            is = "Back-end";
            break;
        case TEAM.FE:
            color = "green";
            is = "Front-end";
            break;
        default:
            color = "red";
            is = "Tester";
            break;
    }
    return (
        <div>
            <Tag color={color} className="w-full text-center">
                {is}
            </Tag>
        </div>
    );
};

export default TeamStatus;

export const TeamStatusProfile = (status) => {
    let is;
    switch (status) {
        case TEAM.BE:
            is = "Back-end";
            break;
        case TEAM.FE:
            is = "Front-end";
            break;
        default:
            is = "Tester";
            break;
    }
    return (
        <div>
            <h1 className="!uppercase !text-xl !font-[600] tracking-[2px]">
                {is}
            </h1>
        </div>
    );
};
