const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


let str = prompt("Введите строоку " , "");
let maxlegth = +prompt("Введите максимальную длинну " , "")
if(str == undefined || str == ""){
    alert("Строка не введена");
}else{
    truncate();
}
function truncate() {
    if (str.length >= maxlegth) {
        return alert(str.slice(0 , maxlegth-1) + "...");
    }else{
        return alert(false);
    }
}
