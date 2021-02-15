const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


let str = prompt("Введите строоку " , "");
let maxLength = +prompt("Введите максимальную длинну " , "")
if(str == undefined || str == ""){
    alert("Строка не введена");
}else{
    truncate();
}
function truncate(str, maxLength) {
    if (str.length >= maxLength) {
        return alert(str.slice(0 , maxLength-1) + "...");
    }else{
        return alert(false);
    }
}
