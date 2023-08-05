const NumberStatus = (status) => {
    switch (status) {
        case 0:
            return "Nộp lưu hồ sơ";
        case 1:
            return "Lưu mới";
        case 2:
            return "Chờ xử lí";
        case 3:
            return "Đã được chấp nhận";
        case 4:
            return "Yêu cầu bổ sung";
        case 5:
            return "Từ chối";
        case 6:
            return "Yêu cầu kết thúc hồ sơ";
        case 7:
            return "Chấp nhận yêu cầu kết thúc hồ sơ";
        case 8:
            return "Yêu cầu bổ sung vào đơn kết thúc hồ sơ";
        case 9:
            return "Từ chối yêu cầu kết thúc hồ sơ";
        default:
            break;
    }
};

export default NumberStatus;
