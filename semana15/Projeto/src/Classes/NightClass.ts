import { Class } from "./Class"

export class NightClass extends Class {
  public setName(name: string) {
    if (name.includes("-na-night")) {
      super.setName(name)
    }
    else{
      console.log('Nome da turma noturna deve conter a experssão "-na-night"')
    }
  }
}