"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const post1 = process.argv[2];
const post2 = process.argv[3];
const post3 = process.argv[4];
const arrayPost = [post1, post2, post3];
Promise.all(arrayPost.map(post => {
    return (axios_1.default.get(`https://jsonplaceholder.typicode.com/posts/${post}`));
}))
    .then((result) => {
    result.map(cadaResult => console.log(cadaResult.data.title));
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=exercício2.js.map