function checkAnagrama(str1: string, str2: string): boolean {
  let copyStr1 = str1.split('')
  let copyStr2 = str2.split('')

  for (let i = 0; i < str1.length; i++) {
    const j = copyStr2.indexOf(str1[i])
    if (j !== -1) {
      copyStr1.splice(0, 1)
      copyStr2.splice(j, 1)
    }
    else {
      return false
    }
  }

  return (copyStr1.length === 0 && copyStr2.length === 0)
}