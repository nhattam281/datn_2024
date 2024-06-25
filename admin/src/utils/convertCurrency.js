export const convertCurrency = (amount) => {
    // hàm chuyển từ số thành tiền
    if (amount >= 1e9) {
        // lớn hơn hoặc bằng 1 tỷ
        return (amount / 1e9).toFixed(1).replace(/\.0$/, '') + ' tỷ';
    } else if (amount >= 1e6) {
        // lớn hơn hoặc bằng 1 triệu
        return (amount / 1e6).toFixed(1).replace(/\.0$/, '') + ' triệu';
    } else {
        return (amount / 1e3).toFixed(1).replace(/\.0$/, '') + ' nghìn';
    }
};
