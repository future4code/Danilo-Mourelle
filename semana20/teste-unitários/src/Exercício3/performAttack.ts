import { Personagem } from "../Exercício1/Personagens";
import { validatePersonagem } from "../Exercício1/validatePesonagem";

export function performAttack(attacker: Personagem, defender: Personagem): void {
    if (!validatePersonagem(attacker) || !validatePersonagem(defender)) {
        throw new Error("Invalid Personagem")
    }
    if (attacker.atack > defender.defense) {
        defender.life -= attacker.atack - defender.defense
    }
}

export function performAttackInvDep(attacker: Personagem, defender: Personagem, validator: (input: Personagem) => boolean) {
    if (!validator(attacker) || !validator(defender)) {
        throw new Error("Invalid Personagem")
    }
    if (attacker.atack > defender.defense) {
        defender.life -= attacker.atack - defender.defense
    }
}

//? Com a inversão de dependência, a segunda implementação não fica mais ligada a função de validação, uma vez que ela pode agora receber qualquer outra função de mesma assinatura.