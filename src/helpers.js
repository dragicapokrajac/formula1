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

export const getColor = (positionAndPoints) => {
    switch (positionAndPoints) {
        // Team details i Driver details
        case "1":
        case "25":
            return "yellow";
            //case 2 u race je lightgreen, u positions je darkgray.
        case "2":
        case "18":
            return "darkgray";
        case "3":
        case "15":
            return "orange";
        case "4":
        case "12":
        case "10":
        case "8":
        case "6":
        case "1":
            return "lightgreen";
        case "5":
        case "6":
        case "7":
        case "8":
            return "lightblue";
        case "9":
        case "10":
            return "gray";
        default:
            return "gray"

    }
}
