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
