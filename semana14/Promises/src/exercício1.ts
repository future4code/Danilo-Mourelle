import { readdir } from 'fs'
/* import { resolve } from 'dns'
import { rejects } from 'assert' */

const myPromisse = new Promise((resolve, reject) => {
  const handleDirectory = (err: Error, files: string[]) => {
    try {
      const allFilesContent: string[] = files
      resolve(allFilesContent)
    } catch (e) {
      reject(err)
    }
  }
  readdir('../textos', handleDirectory)
})

myPromisse
  .then((result: string) => {
    console.log(result)
  })
  .catch((erro) => {
    console.log(erro)
  })
