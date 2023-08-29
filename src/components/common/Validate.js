const getAgeDifference = (today, inputDate) => ({
    ageDiff: today.getFullYear() - inputDate.getFullYear(),
    monthDiff: today.getMonth() - inputDate.getMonth(),
    dayDiff: today.getDate() - inputDate.getDate(),
});

export const validateAge = (maxAge, minAge) => {
    return (_, value) => {
        if (!value) {
            return Promise.reject(new Error("Vui lòng nhập ngày"));
        }

        const today = new Date();
        const inputDate = new Date(value);

        if (inputDate > today) {
            return Promise.reject(new Error("Yêu cầu chọn trước ngày hôm nay"));
        }

        const { ageDiff, monthDiff, dayDiff } = getAgeDifference(
            today,
            inputDate
        );

        if (minAge && !isOverMinAge(ageDiff, monthDiff, dayDiff, minAge)) {
            return Promise.reject(new Error(`Tuổi phải lớn hơn ${minAge}`));
        }

        if (maxAge && !isUnderMaxAge(ageDiff, monthDiff, dayDiff, maxAge)) {
            return Promise.reject(new Error(`Tuổi phải nhỏ hơn ${maxAge}`));
        }

        return Promise.resolve();
    };
};

const isOverMinAge = (ageDiff, monthDiff, dayDiff, minAge) => {
    return (
        ageDiff > minAge ||
        (ageDiff === minAge && monthDiff > 0) ||
        (ageDiff === minAge && monthDiff === 0 && dayDiff >= 0)
    );
};

const isUnderMaxAge = (ageDiff, monthDiff, dayDiff, maxAge) => {
    return (
        ageDiff < maxAge ||
        (ageDiff === maxAge && monthDiff < 0) ||
        (ageDiff === maxAge && monthDiff === 0 && dayDiff < 0)
    );
};

export const validateDate = (start, end) => {
    return (_, value) => {
        if (value) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const currentDateTime = new Date();
            if (new Date(value) > currentDateTime) {
                return Promise.reject(
                    new Error("Yêu cầu chọn trước ngày hôm nay")
                );
            } else if (startDate > endDate) {
                return Promise.reject(
                    new Error("Ngày kết thúc phải sau ngày bắt đầu")
                );
            }
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(`Vui lòng nhập ngày`));
        }
    };
};

export function validateEmployeeCode(_, value) {
    if (value) {
        let regexString = "^NV";
        const year = new Date().getFullYear().toString().slice(-2);
        regexString += year;
        regexString += "\\d{3}$";
        const employeeCodeRegex = new RegExp(regexString);
        const check = employeeCodeRegex.test(value);
        if (!check) {
            return Promise.reject(
                new Error(
                    "Mã nhân viên phải có định dạng NV-YY-XXX ví dụ: NV23001"
                )
            );
        }
        return Promise.resolve();
    } else {
        return Promise.reject(new Error("Vui lòng nhập mã nhân viên"));
    }
}
export const validateCodeInput = (_, value) => {
    if (value) {
        const codePattern =
            /[;{}=^~?<>"'*|\\+\-\]]|function\s*\(|if\s*\(|for\s*\(|while\s*\(/;
        if (codePattern.test(value)) {
            return Promise.reject(
                new Error(
                    "Vui lòng nhập văn bản thuần túy, không phải nội dung giống như mã."
                )
            );
        } else {
            return Promise.resolve();
        }
    } else {
        return Promise.reject(new Error(`Không được để trống trường này!`));
    }
};
