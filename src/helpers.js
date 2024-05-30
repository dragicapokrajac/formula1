export const showFlag = (resFlags, checkParam) => {
    const flagArr = resFlags.filter(x =>
        x.nationality === checkParam || x.en_short_name === checkParam
    );
    if (flagArr.length) {
        return flagArr[0].alpha_2_code;
    } else if (checkParam === 'British' || checkParam === 'UK') {
        return 'GB';
    } else if (checkParam === 'Dutch') {
        return 'NL';
    } else if (checkParam === 'American') {
        return 'US';
    } else if (checkParam === 'Korea') {
        return 'KR';
    };
};