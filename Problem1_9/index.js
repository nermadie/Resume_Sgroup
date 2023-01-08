//Prob 1
//Viết hảm Javascript trả về chuỗi thông tin ngày giờ hiện tại
console.log("Prob-1");
function getDateTime() {
  var date = new Date();
  return date;
}
const now = getDateTime();
console.log(now);

//Prob 2
//Viết hàm để in ra ngày tháng năm với các định dạng mm-dd- yyyy, mm/dd/yyyy, dd-mm-yyyy, dd/mm/yyyy
console.log("Prob-2");
function allFormatsOfDate({ day, month, year }) {
  let dateArr = [day, month, year];
  return dateArr.join('-') + '\n' + dateArr.join('/') + '\n' + dateArr.join('-') + '\n' + dateArr.join('/');
}
const dateInput = {
  day: 28,
  month: 12,
  year: 2022
}
const dateFormatted = allFormatsOfDate(dateInput);
console.log(dateFormatted);

//Prob 3
//Viết hàm JavaScript để kiểm tra xem một số nguyên (1 < n < 10^1000) đã cho có chuỗi chữ số tăng hay không. Chuỗi chữ số tăng là chuỗi chữ số có độ dài bé nhất là 3, chữ số đứng ở sau lớn hơn chữ số đứng trước (ví dụ: 123, 456, 123456, 6789)
console.log("Prob-3");
function isIncreaseChainNumber(n) {
  let strNum = n.toString();
  let count = 0;
  let maxCount = 0;
  for (let i = 0; i < strNum.length - 1; i++) {
    if (strNum[i] >= strNum[i + 1]) {
      maxCount = Math.max(maxCount, count);
      if (maxCount >= 3) return true;
      count = 0;
    }
    else {
      count++;
    }
  }
  if (count >= 3) return true;
  else return false;
}


const number1 = 123456789n
const number2 = 123432112321n
const number3 = 988811111n

console.log(isIncreaseChainNumber(number1)); // true
console.log(isIncreaseChainNumber(number2)); // true
console.log(isIncreaseChainNumber(number3)); // false

//Prob 4
//Viết một hàm JavaScript trả về một chuỗi đã được thay thế mỗi ký tự với ký tự cách nó n ký tự trong bảng chữ cái. (mã hóa caesar)
console.log("Prob-4");
function getCaesarString(text, step) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if ((text[i] >= "a" && text[i] <= "z") || (text[i] >= "A" && text[i] <= "Z")) {
      let charCode;
      if (text.charCodeAt(i) < 91)
        charCode = ((text.charCodeAt(i) - 65 + step) % 26) + 65;
      else
        charCode = ((text.charCodeAt(i) - 97 + step) % 26) + 97;
      result += String.fromCharCode(charCode);
    }
    else
      result += text[i];
  }
  return result;
}

const name = "Hoang Nhan"
const cypherText = getCaesarString(name, 3)

console.log(cypherText) // Krdqj Qkdq

//Prob 5
//Viết chương trình hiển thị số xuất hiện nhiều lần nhất trong mảng
console.log("Prob-5");
function highestFreqNumber(numbers) {
  let mapResult = new Map();
  numbers.forEach(number => {
    mapResult.set(number, mapResult.has(number) ? mapResult.get(number) + 1 : 1);
  });
  let maxVal = Math.max(...mapResult.values());
  let result = [];
  mapResult.forEach((value, key) => {
    if (value == maxVal) result.push(key);
  });
  return result;
}

const numbers = [1, 2, 3, 5, 6, 7, 4, 7, 3, 2, 1, 6, 7, 8, 7, 7, 1, 7, 3, 7, 9999, 7, 123, 7]

console.log(highestFreqNumber(numbers)) // 7

//Prob 6
//Viết chương trình để kiểm tra xem chuỗi (không phân biệt hoa thường) chứa 'javascript' hay không
console.log("Prob-6");
function isIncludeJS(str) {
  return str.toLowerCase().includes("javascript") ? true : false;
}

const str1 = "asdsajkzzjAVAscriptttaskldjkl123aszxc"
const str2 = "jjjjjjjavaaaaScriptttttttttt"
const str3 = "888javaScript888"

console.log(isIncludeJS(str1)); //true
console.log(isIncludeJS(str2)); //false
console.log(isIncludeJS(str3)); //true

//Prob 7
//Viết hàm trả về tên tiếng Anh của tháng từ một số cụ thể: ví dụ 1 → January
console.log("Prob-7");
function getMonthName(monthNumber) {
  let date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString('en-us', { month: 'long' });
}

console.log(getMonthName(3)) // March
console.log(getMonthName(4)) // April

//Prob 8
//Viết một hàm JavaScript tìm từ dài nhất trong chuỗi
console.log("Prob-8");
function longestWord(str) {
  let words = str.split(/[^a-zA-Z]/);
  words = words.filter(word => word.length > 0);
  let maxLen = Math.max(...words.map(word => word.length));
  let result = [];
  words.forEach(word => {
    if (word.length == maxLen)
      result.push(word);
  });
  return result;
}

const str = "Little darlin', it's been a loooooong, cold, lonely winter"

console.log(longestWord(str)) // loooooong


//Prob 9
//Viết hàm tính tổng các chữ số khác 5 của một số nguyên tố (lớn) sử dụng hàm reduce và filter
console.log("Prob-9");
function sum(number) {
  let strNum = number.toString();
  let arrNum = strNum.split("");
  return arrNum.filter(num => num != "5").reduce((c1, c2) => +c1 + +c2);
}

console.log(sum(1231312321378127391237219312n)) // 90
console.log(sum(99999999999999999999999999999n))// 261
console.log(sum(12345678908765432123456555566n)) // 98
