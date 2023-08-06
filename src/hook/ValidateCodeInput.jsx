const validateCodeInput = (_, value) => {
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

export default validateCodeInput;
