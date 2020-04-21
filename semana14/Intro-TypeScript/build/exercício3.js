const post1 = {
    author: 'banana',
    text: 'Não gosto de banana'
};
const post2 = {
    author: 'morango',
    text: 'Não gosto de morango'
};
const post3 = {
    author: 'banana',
    text: 'Adoro banana'
};
const post4 = {
    author: 'morango',
    text: 'Adoro morango'
};
const post5 = {
    author: 'melancia',
    text: 'Adoro melancia'
};
const arrayDePost = [post1, post2, post3, post4, post5];
function searchOnArray(arrayEx3, author) {
    return arrayEx3.filter(post => post.author === author);
}
const ex3 = searchOnArray(arrayDePost, "morango");
console.log(ex3);
//# sourceMappingURL=exercício3.js.map