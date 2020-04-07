export function ordenarArrayEmOrdemCrescente(array) {
  let newArray = array.slice()
  for (let a = 0; a < newArray.length; a++) {
    for (let b = a + 1 ; b < newArray.length; b++) {
      if(newArray[a] > newArray[b]){
        let aux = newArray[a]
        newArray[a] = newArray[b]
        newArray[b] = aux
      }
    }
  }
  return newArray
}
