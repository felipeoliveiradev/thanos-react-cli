const fs = require("fs");
export const Replace = (raizIndex: string, value: any, value2: any) => {
  fs.readFile(raizIndex, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(value, value2).trim();

    fs.writeFile(raizIndex, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}