const useSplitParagraphs = (text, maxLength) => {
    const paragraphs = [];
    while (text?.length > 0) {
        const paragraph = text.substring(0, maxLength);
        paragraphs.push(paragraph);
        text = text.substring(maxLength);
    }
    return paragraphs;
};

export default useSplitParagraphs;
