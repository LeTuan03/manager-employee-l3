const validateCodeInput = (_, value) => {
    const codePattern =
        /[;{}=^~?<>"'*|\\+\-\]]|function\s*\(|if\s*\(|for\s*\(|while\s*\(/;
    if (codePattern.test(value)) {
        return Promise.reject(
            new Error("Please enter plain text, not code-like content.")
        );
    } else {
        return Promise.resolve();
    }
};

export default validateCodeInput;
