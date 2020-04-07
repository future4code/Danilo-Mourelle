import { sorteiaNumero } from "./ex3";

describe("Sorteia Número", () => {
  it("Primeiro teste", () => {
    //Prepação
    const min = 1, max = 100
    //Execução
    const result = sorteiaNumero(min, max);
    //Esperado
    const entreMinEMax =  min <= result && result<= max
    expect(entreMinEMax).toBe(true)
  });
});
