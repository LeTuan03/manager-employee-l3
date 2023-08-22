import { GENDER } from "../../constants/constants";

const Gender = (gender) => {
    switch (gender) {
        case GENDER.FEMALE:
            return "Nữ";
        case GENDER.MALE:
            return "Nam";
        default:
            return "Khác";
    }
};

export default Gender;
