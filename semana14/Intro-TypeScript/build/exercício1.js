function doTheMath(x, y) {
    let resultF;
    if (x >= y) {
        resultF = {
            soma: x + y,
            subtracao: x - y,
            multiplicacao: x * y,
            maior: x
        };
    }
    else {
        resultF = {
            soma: x + y,
            subtracao: y - x,
            multiplicacao: x * y,
            maior: y
        };
    }
    return resultF;
}
let output = doTheMath(2, 3);
console.log(output);
output = doTheMath(4, 3);
console.log(output);
//# sourceMappingURL=exercício1.js.map