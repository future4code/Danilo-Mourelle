type post = {
  author: string,
  text: string
}

const post1: post = {
  author: 'banana',
  text: 'Não gosto de banana'
}
const post2: post = {
  author: 'morango',
  text: 'Não gosto de morango'
}
const post3: post = {
  author: 'banana',
  text: 'Adoro banana'
}
const post4: post = {
  author: 'morango',
  text: 'Adoro morango'
}
const post5: post = {
  author: 'melancia',
  text: 'Adoro melancia'
}

const arrayDePost: post[] = [post1, post2,post3, post4, post5]

function searchOnArray(arrayEx3: post[], author:string): post[]{
  return arrayEx3.filter(post => post.author === author)
}

const ex3 = searchOnArray(arrayDePost,"morango")
console.log(ex3)