import { readdir, readFile } from 'fs'
import { resolve } from 'dns'
import { rejects } from 'assert'
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

let filesArray: string[] = []

myPromisse
  .then((result: string[]) => {
    console.log(result)
    filesArray = result
    Promise.all(filesArray.map(file => {
      return (
        new Promise((resolve, reject) => {
          const fileReading = (err: Error, data: Buffer) => {
            try {
              const fileContent: string = data.toString()
              resolve(fileContent)
            } catch (erro) {
              reject(`Problemas ao ler o arquvi ${file}`)
            }
          }
          readFile(`../textos/${file}`, fileReading)
        })
      )
    }))
      .then((result) => {
        console.log(result)
      })
      .catch((erro) => {
        console.log(erro)
      })
  })
  .catch((erro) => {
    console.log(erro)
  })

