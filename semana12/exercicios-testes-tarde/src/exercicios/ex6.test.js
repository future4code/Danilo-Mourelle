import { primeirasLetrasParaMaiusculas } from "./ex6";

describe("Ordena array em ordem crescente", () => {
  it("Primeiro teste", () => {
    const teste = "Oi! Sou uma string bem legal para testes!";
    const resultado = primeirasLetrasParaMaiusculas(teste);

    expect(resultado).toBe('Oi! Sou Uma String Bem Legal Para Testes!')
  });
  it("Primeiro teste", () => {
    const teste = "OI! SOU UMA STRING BEM LEGAL PARA TESTES!";
    const resultado = primeirasLetrasParaMaiusculas(teste);

    expect(resultado).toBe('Oi! Sou Uma String Bem Legal Para Testes!')
  });
  it("Primeiro teste", () => {
    const teste = "oi! sou uma string bem legal para testes!";
    const resultado = primeirasLetrasParaMaiusculas(teste);

    expect(resultado).toBe('Oi! Sou Uma String Bem Legal Para Testes!')
  });
  it("Primeiro teste", () => {
    const teste = "Oi! sOu uMa sTrInG bEm LeGaL pArA tEsTeS!";
    const resultado = primeirasLetrasParaMaiusculas(teste);

    expect(resultado).toBe('Oi! Sou Uma String Bem Legal Para Testes!')
  });
});
