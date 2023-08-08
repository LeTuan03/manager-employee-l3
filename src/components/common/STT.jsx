const STT = (data) => {
    const newData = data.map((item, index) => {
        return { ...item, index };
    });
    return newData;
};

export default STT;
