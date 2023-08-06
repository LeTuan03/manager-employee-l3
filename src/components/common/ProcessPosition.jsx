const ProcesPosition = (status) => {
    switch (status) {
        case 0:
            return "Giám đốc";
        case 1:
            return "Trưởng phòng";
        default:
            return "Quản lí";
    }
};

export default ProcesPosition;
