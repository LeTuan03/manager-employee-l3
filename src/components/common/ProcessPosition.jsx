const ProcesPosition = (status) => {
    switch (status) {
        case 0:
            return "Giám đốc";
        case 1:
            return "Trưởng phòng";
        case 2:
            return "Quản lí";
        case 3:
            return "Quản lí";
        case 4:
            return "Quản lí";
        default:
            return "Trưởng phòng";
    }
};

export default ProcesPosition;
