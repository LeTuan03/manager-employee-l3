const useTruncateText = (text, maxChars) => {
    if (text.length <= maxChars) {
        return text;
    } else {
        return text.slice(0, maxChars - 3) + '...';
    }
};

export default useTruncateText;
