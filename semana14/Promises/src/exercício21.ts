import axios from 'axios'

enum operations {
  post = 'getPosts',
  comments = 'getPostComments'
}

const operation: string = process.argv[2]
const post1: string = process.argv[3]
const post2: string = process.argv[4]
const post3: string = process.argv[5]

const arrayPost: string[] = [post1, post2, post3]
switch (operation) {
  case operations.post:
    Promise.all(arrayPost.map(post => {
      if (post) {
        return (
          axios.get(`https://jsonplaceholder.typicode.com/posts/${post}`)
        )
      }
    }))
      .then((result) => {
        result.map(cadaResult => console.log(cadaResult.data))
      })
      .catch((error) => {
        console.log(error)
      })
    break;

  case operations.comments:
    axios.get(`https://jsonplaceholder.typicode.com/posts/${post1}/comments`)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

  default:
    console.log('Operação não encontrada')
    break;
}
