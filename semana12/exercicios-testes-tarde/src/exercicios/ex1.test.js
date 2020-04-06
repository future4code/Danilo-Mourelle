import { anoBissexto } from "./ex1";

describe("Ano bissexto", () => {
  teste("Verifica se multiplo de 400 é bissexto", () => {
    
    const resultado = anoBissexto(2400);
    expect(resultado).toBe(true)
  });
  teste("Verifica se multiplo de 4", () => {
    
    const resultado = anoBissexto(1996);
    expect(resultado).toBe(true)
  });
  teste("Verifica se multiplo de 4 e 100 mas não 400 é bissexto", () => {
    
    const resultado = anoBissexto(1900);
    expect(resultado).toBe(true)
  });
  teste("Verifica se ano não referente as regras anteriores", () => {
    
    const resultado = anoBissexto(1999);
    expect(resultado).toBe(true)
  });
});
