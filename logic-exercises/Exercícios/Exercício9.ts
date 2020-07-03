function transcriptDNA(stringDNA: string): string {
  const uppercaseDNA:string[] = stringDNA.toUpperCase().split('')

  return uppercaseDNA.map(char => {
    switch (char) {
      case 'A':
        return 'U'
      case 'T':
        return 'A'
      case 'G':
        return 'C'
      case 'C':
        return 'G'
    }
  }).join('')

}

console.log(transcriptDNA('GATACA'))