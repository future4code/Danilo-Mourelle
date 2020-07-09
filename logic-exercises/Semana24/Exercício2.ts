function numberInverted(num: number): number {
  const numberInString: string = Math.abs(num).toString()
  const stringReverse: string = numberInString.split('').reverse().join('')

  return num >= 0 ? Number(stringReverse) : Number(stringReverse) * -1
}