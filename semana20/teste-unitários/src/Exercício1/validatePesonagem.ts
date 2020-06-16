import { Personagem } from "./Personagens";

export function validatePersonagem(input: Personagem): boolean {
    if (!input.name || input.atack === undefined || input.defense === undefined || input.life === undefined) {
        return false
    }
    if (input.atack < 0 || input.defense < 0 || input.life < 0) {
        return false
    }
    return true
}

