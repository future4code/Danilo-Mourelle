function changeSeconsToHourString(input: number): string {
  const seconds = input % 60
  const minutes = parseInt((input / 60).toString()) % 60
  const hours = parseInt((input / 3600).toString())

  return `${hours}h ${minutes}m ${seconds}s`
}

console.log(changeSeconsToHourString(3725))