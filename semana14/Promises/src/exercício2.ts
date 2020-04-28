import axios from 'axios'

const post1: string = process.argv[2]
const post2: string = process.argv[3]
const post3: string = process.argv[4]

const arrayPost: string[] = [post1, post2, post3]

Promise.all(arrayPost.map(post => {
  return (
    axios.get(`https://jsonplaceholder.typicode.com/posts/${post}`)
  )
}))
  .then((result) => {
    result.map(cadaResult => console.log(cadaResult.data.title))
  })
  .catch((error) => {
    console.log(error)
  })