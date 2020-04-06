import { ordenarArrayEmOrdemCrescente } from "./ex5";

function comparaArray(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe("Ordena array em ordem crescente", () => {
  it("Primeiro teste", () => {
    const teste = [4, 3, 2, 1];

    const ordenanda = ordenarArrayEmOrdemCrescente(teste);

    const resultado = comparaArray(teste, ordenanda)
    expect(resultado).toBe(false)
  });
  it("Segundo teste", () => {
    const teste = [1, 2, 3, 4];

    const ordenanda = ordenarArrayEmOrdemCrescente(teste);

    const resultado = comparaArray(teste, ordenanda)
    expect(resultado).toBe(true)
  });

});
