//Prob 10
//Viết một chương trình (có index.html với file script.js), sao cho lúc vào index.html lần đầu thì hiển thị một prompt “Nhập tên của bạn”, sau khi nhập tên thì trên index.html hiển thị text “Hello, <tên vừa nhập trong prompt>”. Tải lại trang thì không bắt nhập lại tên nữa, nhưng vẫn hiển thị dòng text “Hello, <tên vừa nhập trong prompt>” như trên. Và đương nhiên nhập rỗng thì bắt nhập lại tên

// deleteCookie("name");
const greetingText = document.getElementById("greeting");
let nameOfUser = getCookie("name");
if (nameOfUser == null || nameOfUser == "" || nameOfUser == "null") {
  while (true) {
    let value = prompt("Nhập tên của bạn");
    if (value != null && value != "" && value != "null") {
      setCookie("name", value, 365);
      break;
    }
  }
  greetingText.textContent = `Hello, ${getCookie("name")}`;
}
else {
  greetingText.textContent = `Hello, ${nameOfUser}`;
}


function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
function deleteCookie(name) {
  setCookie(name, null, null);
}
function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");
  let result = null;

  cArray.forEach(element => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });
  return result;
}