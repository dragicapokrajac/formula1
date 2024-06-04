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

export const showColor = (number, value) => {
   // points je u RaceResults, za position je u DriverDetails i TeamDetails
   const switchColor = (color1, color2) => {
      if (value === 'points') {
         return color1;
      } else if (value === 'position') {
         return color2;
      };
   };

   switch (number) {
      case "1":            // points    position
         return switchColor("crimson", "yellow");
      case "2":
         return switchColor('limegreen', 'gray');
      case "3":
      case "15":
         return "orange";
      case "4":
         return switchColor('hotpink', 'lightgreen');
      case "5":
         return 'lightblue';
      case "6":
         return switchColor('steelblue', 'darkorchid');
      case "7":
         return 'steelblue';
      case "8":
         return switchColor('darkorchid', 'hotpink');
      case "9":
         return 'limegreen';
      case "10":
         return switchColor('lightblue', 'crimson');
      case "12":
         return "lightgreen";
      case "18":
         return "gray";
      case "25":
         return "yellow";
      default:
         return "silver";
   };
};

export const navigateHandler = (route, navigate) => {
   navigate(route);
};