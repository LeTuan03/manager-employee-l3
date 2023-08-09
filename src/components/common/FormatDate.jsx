import { format } from "date-fns";

const formatDate = (date) => {
    return (
        <>
            ngày {date && format(new Date(date), "dd")} tháng{" "}
            {date && format(new Date(date), "MM")} năm{" "}
            {date && format(new Date(date), "yyyy")}{" "}
        </>
    );
};
export default formatDate;
