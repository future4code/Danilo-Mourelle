type result1 = {
    soma: number,
    subtracao: number,
    multiplicacao: number,
    maior: number
}
function doTheMath(x: number, y: number): result1 {
    let resultF: result1
    if (x >= y) {
        resultF = {
            soma: x + y,
            subtracao: x - y,
            multiplicacao: x * y,
            maior: x
        }
    } else {
      resultF = {
            soma: x + y,
            subtracao: y - x,
            multiplicacao: x * y,
            maior: y
        }
    }
    return resultF
}

let output = doTheMath(2,3)
console.log(output)
output =  doTheMath(4,3)
console.log(output)
