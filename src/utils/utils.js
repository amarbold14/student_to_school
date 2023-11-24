import moment from "moment";

export function formatNumber(
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount =
        decimalCount > 0
          ? Math.abs(Number(amount) || 0).toFixed(decimalCount)
          : Math.trunc(Number(amount) || 0)),
      10
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

export function intToString(value) {
  let suffixes = ["", "k", "m", "b", "t"];
  let suffixNum = Math.floor(("" + value).length / 3);
  let shortValue = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
}
export function formatDate(date, isHaveTime, dash = false, period = false) {
  let tempDate = moment(date, moment.defaultFormat).toDate();
  let year = tempDate.getFullYear();
  let month =
    tempDate.getMonth() + 1 > 9
      ? tempDate.getMonth() + 1
      : "0" + (tempDate.getMonth() + 1);
  let day =
    tempDate.getDate() > 9 ? tempDate.getDate() : "0" + tempDate.getDate();
  let hour =
    tempDate.getHours() > 9 ? tempDate.getHours() : "0" + tempDate.getHours();
  let minute =
    tempDate.getMinutes() > 9
      ? tempDate.getMinutes()
      : "0" + tempDate.getMinutes();
  if (isHaveTime) {
    if (dash) {
      return year + "-" + month + "-" + day + " " + hour + ":" + minute;
    }
    if (period) {
      return year + "." + month + "." + day + " " + hour + ":" + minute;
    }
    return year + "/" + month + "/" + day + " " + hour + ":" + minute;
  } else {
    if (dash) {
      return year + "-" + month + "-" + day;
    }
    if (period) {
      return year + "." + month + "." + day;
    }
    return year + "/" + month + "/" + day;
  }
}
