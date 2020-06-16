export const handler = async event => {
  const text: string = event.text
  if (text.indexOf("@") === -1) {
    return {
      isEmail: false,
      reason: 'There is no @'
    }
  }
  if (text[text.length - 1] === '.') {
    return {
      isEmail: false,
      reason: 'text end in "."'
    }
  }
  return {
    isEmail: true,
  }
}