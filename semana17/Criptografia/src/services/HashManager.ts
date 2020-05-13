import * as bcrypt from 'bcryptjs'

export class HashManager{
  public async generateHash(plainText: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST)
    const salt = await bcrypt.genSalt((rounds))
    const hash = await bcrypt.hash(plainText, salt)

    return hash
  }

  public async compare(plaintext:string, hash:string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash)
  }
}
