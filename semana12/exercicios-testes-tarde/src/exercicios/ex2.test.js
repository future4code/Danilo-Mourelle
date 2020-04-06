import { checaPalindromo } from "./ex2";

describe("Checa Palíndromo", () => {
  it("Teste palavra unica verdadeira", () => {
    const result = checaPalindromo('mirim');
    expect(result).toBe(true)
  });
  it("Teste palavra unica falsa", () => {
    const result = checaPalindromo('amor');
    expect(result).toBe(false)
  });
  it("Teste frase verdadeira", () => {
    const result = checaPalindromo('A mala nada na lama');
    expect(result).toBe(true)
  });
  it("Teste frase falsa", () => {
    const result = checaPalindromo('A mala nada na lagoa');
    expect(result).toBe(false)
  });
 /* ' test("Ignora acento e  teste", () => {
    const result = checaPalindromo();
    expect(result).
  });' */
});
