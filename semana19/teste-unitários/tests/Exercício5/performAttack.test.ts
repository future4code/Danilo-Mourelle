import { Personagem } from "../../src/Exercício1/Personagens"
import { performAttackInvDep } from "../../src/Exercício3/performAttack"

describe("Testing performAttack", () => {
    test("Should return defender's life minus 200 from initial state", () => {
        const validatePersonagemMock = jest.fn(() => {
            return true
        })
        const attacker: Personagem = {
            name: 'Growlithe',
            defense: 850,
            attack: 920,
            life: 1500
        }
        const defender: Personagem = {
            name: 'Meowth',
            defense: 720,
            attack: 1150,
            life: 1500
        }

        performAttackInvDep(attacker, defender, validatePersonagemMock)

        expect(defender.life).toBe(1500 - (attacker.attack - defender.defense))
        expect(validatePersonagemMock).toHaveBeenCalledTimes(2)
        expect(validatePersonagemMock).toHaveBeenCalledWith(attacker)
        expect(validatePersonagemMock).toHaveBeenCalledWith(defender)
    })
    test("Should return a error with defender has empty name", () => {
        const validatePersonagemMock = jest.fn(() => {
            return false
        })
        const attacker: Personagem = {
            name: 'Growlithe',
            defense: 850,
            attack: 920,
            life: 1500
        }
        const defender: Personagem = {
            name: '',
            defense: 720,
            attack: 1150,
            life: 1500
        }
        expect.assertions(2)
        try {
            performAttackInvDep(attacker, defender, validatePersonagemMock)

        } catch (error) {

            expect(validatePersonagemMock).toHaveBeenCalled()
            expect(error.message).toBe("Invalid Personagem")
        }
    })
})