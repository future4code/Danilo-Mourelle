import { Personagem } from "../../src/Exercício1/Personagens"
import { validatePersonagem } from "../../src/Exercício1/validatePesonagem"

describe("Testing validatePersonagem.ts", () => {
    test("Should return FALSE for input with empty name", () => {
        const personagem: Personagem = {
            name: '',
            life: 1500,
            defense: 850,
            atack: 920
        }

        const result = validatePersonagem(personagem)

        expect(result).toBe(false)
    })
    // ! Os teste abaixo falaham pelo fato de não cumprirem o tipo do input
    /*test("Should return FALSE for input with empty life", () => {
        const personagem: Personagem = {
            name: 'Growlithe',
            defense: 850,
            atack: 920
        }

        const result = validatePersonagem(personagem)

        expect(result).toBe(false)
    })
         test("Should return FALSE for input with empty atack", () => {
            const personagem: Personagem = {
                name: 'Growlithe',
                life: 1500,
                defense: 850,
            }
    
            const result = validatePersonagem(personagem)
    
            expect(result).toBe(false)
        })
        test("Should return FALSE for input with empty defense", () => {
            const personagem: Personagem = {
                name: 'Growlithe',
                life: 1500,
                atack: 920,
            }
    
            const result = validatePersonagem(personagem)
    
            expect(result).toBe(false)
        }) */
    test("Should return FALSE for input with numbers field with negative values", () => {
        const personagem: Personagem = {
            name: 'Growlithe',
            life: 1500,
            defense: -850,
            atack: 920
        }

        const result = validatePersonagem(personagem)

        expect(result).toBe(false)
    })
    test("Should return TRUE for input with atack, life or defense = 0 ", () => {
        const personagem: Personagem = {
            name: 'Growlithe',
            life: 1500,
            defense: 850,
            atack: 0
        }

        const result = validatePersonagem(personagem)

        expect(result).toBe(true)
    })
    test("Should return TRUE for input with correct data", () => {
        const personagem: Personagem = {
            name: 'Growlithe',
            life: 1500,
            defense: 850,
            atack: 920
        }

        const result = validatePersonagem(personagem)

        expect(result).toBe(true)
    })
})