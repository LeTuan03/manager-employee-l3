const convertToLiFormat = (str) => {
    let lines = str.split("\n");
    let formatted = lines.map((line) => <li>{line.trim()}</li>);
    return formatted;
};

export default convertToLiFormat;
