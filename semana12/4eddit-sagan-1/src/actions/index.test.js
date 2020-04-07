import {
  signup,
  login,
  publishPost,
  getPosts,
  getPostDetails,
  votePost,
  publishComments,
  voteComment,
  setPost,
  setPostDetails,
  setPostIdForDetails
} from './index'

const mockPost = [
  {
    "userVoteDirection": -1,
    "id": "0COaXIBbosGCvdIMNv9Y",
    "username": "SeiLa",
    "createdAt": 1585748516971,
    "title": "Atirei o pau no gato!",
    "votesCount": 5,
    "commentsCount": 15,
    "text": "E ele morreu!"
  },
  {
    "userVoteDirection": 0,
    "id": "0NoeYw8soteSToaGl2e8",
    "text": "Meu outro post",
    "username": "Astrodev",
    "createdAt": 1585676775285,
    "title": "Outro post",
    "votesCount": 5,
    "commentsCount": 8
  },
  {
    "userVoteDirection": 0,
    "id": "0tPTBygOm8sCxtcGVxtB",
    "text": "Sou apenas um teste",
    "username": "Astrodev",
    "createdAt": 1585926856233,
    "title": "Testando",
    "votesCount": 1,
    "commentsCount": 2
  }]

describe('Actions that handle Posts', () => {
  /*   test('signup', () => {
     const mockSignupForm = {
       username: 'joaquim@maluco.com',
       password: '123456'
     }
     const mockedAction = signup(mockSignupForm)
     dispatch = jest.fn()
     
     expect(mockedAction)
    }) */

  test('setPost', () => {
    const mockedAction = setPost(mockPost)

    expect(mockedAction.type).toEqual("SET_POST_LIST")
    expect(mockedAction.payload.listPost).toHaveLength(mockPost.length)
    expect(mockedAction.payload.listPost[0]).toEqual(mockPost[0])
  })

/*   test('setPostDetails', () => {
    const mockSignupForm = {
      username: 'joaquim@maluco.com',
      password: '123456'
    }
    const mockedAction = setPostDetails(mockSignupForm)


    expect(mockedAction)
  })

  test('setPostIdForDetails', () => {
    const mockSignupForm = {
      username: 'joaquim@maluco.com',
      password: '123456'
    }
    const mockedAction = setPostIdForDetails(mockSignupForm)


    expect(mockedAction)
  }) */
})