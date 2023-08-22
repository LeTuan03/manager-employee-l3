import { STATUS_EMPLOYEE_NUMBER } from "../../constants/constants";

const {
    SUBMIT_FILE_SAVE,
    NEW_SAVE,
    PENDING,
    BEEN_APPEOVED,
    ADDITIONAL_REQUIREMENTS,
    REJECT,
    PROFILE_END_REQUEST,
    ACCEPT_REQUEST_END_PROFILE,
    ADDITIONAL_REQUIREMENTS_END_PROFILE,
    REJECT_REQUEST_END_PROFILE,
} = STATUS_EMPLOYEE_NUMBER;

const NumberStatus = (status) => {
    switch (status) {
        case SUBMIT_FILE_SAVE:
            return "Nộp lưu hồ sơ";
        case NEW_SAVE:
            return "Lưu mới";
        case PENDING:
            return "Chờ xử lí";
        case BEEN_APPEOVED:
            return "Đã được chấp nhận";
        case ADDITIONAL_REQUIREMENTS:
            return "Yêu cầu bổ sung";
        case REJECT:
            return "Từ chối";
        case PROFILE_END_REQUEST:
            return "Gửi yêu cầu kết thúc hồ sơ";
        case ACCEPT_REQUEST_END_PROFILE:
            return "Chấp nhận yêu cầu kết thúc hồ sơ";
        case ADDITIONAL_REQUIREMENTS_END_PROFILE:
            return "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
        case REJECT_REQUEST_END_PROFILE:
            return "Từ chối yêu cầu kết thúc hồ sơ";
        default:
            break;
    }
};

export default NumberStatus;
