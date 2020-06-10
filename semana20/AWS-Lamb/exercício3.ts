export const handler = async event => {
  const text = event.text
  return event.num1 + event.num2
 };