export function checkAnagrama(s: string, t: string): boolean {
  let arrS = s.split('')
  let arrT = t.split('')

  for (let i = 0; i < s.length; i++) {
    const j = arrT.indexOf(s[i])
    if (j !== -1) {
      arrS.splice(0, 1)
      arrT.splice(j, 1)
    }
    else {
      return false
    }
  }

  return (arrS.length === 0 && arrT.length === 0)
}