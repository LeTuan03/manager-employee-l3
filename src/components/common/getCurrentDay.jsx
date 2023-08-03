const getDayMonthYear = (value) => {
    const date = new Date(value);
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
};
export default getDayMonthYear;
