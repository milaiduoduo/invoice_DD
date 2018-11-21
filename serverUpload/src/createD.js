const fs = require("fs");
console.log("创建目录d:/temp2/");
// fs.mkdir("d:/temp2/", function (err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("目录创建成功")
// })

// 需要版本支持 v.10.12以上
fs.mkdir("d:\temp2/20181120/", {
    recursive: true
}, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("目录创建成功！")
})