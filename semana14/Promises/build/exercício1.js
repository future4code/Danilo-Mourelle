"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const myPromisse = new Promise((resolve, reject) => {
    const handleDirectory = (err, files) => {
        try {
            const allFilesContent = files;
            resolve(allFilesContent);
        }
        catch (e) {
            reject(err);
        }
    };
    fs_1.readdir('../textos', handleDirectory);
});
let filesArray = [];
myPromisse
    .then((result) => {
    console.log(result);
    filesArray = result;
    Promise.all(filesArray.map(file => {
        return (new Promise((resolve, reject) => {
            const fileReading = (err, data) => {
                try {
                    const fileContent = data.toString();
                    resolve(fileContent);
                }
                catch (erro) {
                    reject(`Problemas ao ler o arquvi ${file}`);
                }
            };
            fs_1.readFile(`../textos/${file}`, fileReading);
        }));
    }))
        .then((result) => {
        console.log(result);
    })
        .catch((erro) => {
        console.log(erro);
    });
})
    .catch((erro) => {
    console.log(erro);
});
//# sourceMappingURL=exercício1.js.map