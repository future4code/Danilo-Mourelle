import { Personagem } from "../../src/Exercício1/Personagens"
import { performAttackInvDep } from "../../src/Exercício3/performAttack"

describe("Testing performAttack", () => {
    test("Should return defender's life minus 200 from initial state", () => {
        const validatePernsonagemMock = jest.fn(() => {
            return true
        })
        const attacker: Personagem = {
            name: 'Growlithe',
            defense: 850,
            atack: 920,
            life: 1500
        }
        const defender: Personagem = {
            name: 'Meowth',
            defense: 720,
            atack: 1150,
            life: 1500
        }

        performAttackInvDep(attacker, defender, validatePernsonagemMock)

        expect(defender.life).toBe(1500 - (attacker.atack - defender.defense))
        expect(validatePernsonagemMock).toHaveBeenCalledTimes(2)
        expect(validatePernsonagemMock).toHaveBeenCalledWith(attacker)
        expect(validatePernsonagemMock).toHaveBeenCalledWith(defender)
    })
    test("Should return a error with defender has empty name", () => {
        const validatePernsonagemMock = jest.fn(() => {
            return false
        })
        const attacker: Personagem = {
            name: 'Growlithe',
            defense: 850,
            atack: 920,
            life: 1500
        }
        const defender: Personagem = {
            name: '',
            defense: 720,
            atack: 1150,
            life: 1500
        }
        expect.assertions(2)
        try {
            performAttackInvDep(attacker, defender, validatePernsonagemMock)

        } catch (error) {

            expect(validatePernsonagemMock).toHaveBeenCalled()
            expect(error.message).toBe("Invalid Personagem")
        }
    })
})