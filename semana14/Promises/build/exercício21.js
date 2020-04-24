"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
var operations;
(function (operations) {
    operations["post"] = "getPosts";
    operations["comments"] = "getPostComments";
})(operations || (operations = {}));
const operation = process.argv[2];
const post1 = process.argv[3];
const post2 = process.argv[4];
const post3 = process.argv[5];
const arrayPost = [post1, post2, post3];
switch (operation) {
    case operations.post:
        Promise.all(arrayPost.map(post => {
            if (post) {
                return (axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${post}`));
            }
        }))
            .then((result) => {
            result.map(cadaResult => console.log(cadaResult.data));
        })
            .catch((error) => {
            console.log(error);
        });
        break;
    case operations.comments:
        axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${post1}/comments`)
            .then(response => {
            console.log(response.data);
        })
            .catch(error => {
            console.log(error);
        });
    default:
        console.log('Operação não encontrada');
        break;
}
//# sourceMappingURL=exercício21.js.map