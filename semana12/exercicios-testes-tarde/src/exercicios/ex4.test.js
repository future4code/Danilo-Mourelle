import { removeItensDuplicados } from "./ex4";

function comparaArray(a, b) {
  if (a === b) return true;''
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe("Remove itens duplicados", () => {
  it("O array [1, 2, 3, 2, 4] deverá ficar [1, 2, 3, 4]", () => {
    const teste = [1, 2, 3, 2, 4];
    
    const naoRepetida = removeItensDuplicados(teste);
    
    const resultado = comparaArray(teste, naoRepetida)
    expect(resultado).toBe(false)
  });

  it("O array [1, 2, 3, 4] deverá ficar [1, 2, 3, 4]", () => {
    const teste = [1, 2, 3, 4];

    const naoRepetida = removeItensDuplicados(teste);
   
    const resultado = comparaArray(teste, naoRepetida)
    expect(resultado).toBe(true)
  });
});
