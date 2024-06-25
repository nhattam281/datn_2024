export const displayGender = (postGender) => {
    if (postGender === null || postGender === undefined) {
        return 'Tất cả';
    } else if (postGender.toLowerCase() === 'male') {
        return 'Nam';
    } else if (postGender.toLowerCase() === 'female') {
        return 'Nữ';
    } else {
        return 'Tất cả'; // Trường hợp giá trị gender không hợp lệ
    }
};
