import * as jwt from 'jsonwebtoken'

export class Autorizer{
  public generateToken(payload: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: payload.id
      },
      process.env.JWT_KEY as string
    )
    return token
  }

  public getData(token:string): AuthenticationData {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as any

    return ({ id: payload.id})
  }
}

interface AuthenticationData {
  id: string
}