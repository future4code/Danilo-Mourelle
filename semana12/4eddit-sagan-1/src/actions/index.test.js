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

const mockPostList = [
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

const mockPostDetails = {
  "comments": [
    {
      "userVoteDirection": 0,
      "id": "U95U5yFQKGqW7BIv6lbU",
      "text": "Que engraçado!",
      "username": "Mariazinha",
      "createdAt": 1586049158958
    },
    {
      "userVoteDirection": 0,
      "id": "sZ1V7rQDvJ8hGlBk0xdd",
      "votesCount": 0,
      "text": "oi",
      "username": "rosana",
      "createdAt": 1585877853031
    }
  ],
  "userVoteDirection": 0,
  "id": "4SIVI0M7H8IK78oYxXUI",
  "votesCount": 0,
  "commentsCount": 2,
  "text": "https://vidadeprogramador.com.br/wp-content/uploads/2014/07/tirinha1256.png",
  "username": "viajante intergalático",
  "createdAt": 1585874108579,
  "title": "Piadinha"
}

describe('Actions that handle Posts', () => {
  test('setPost', () => {
    const mockedAction = setPost(mockPostList)

    expect(mockedAction.type).toEqual("SET_POST_LIST")
    expect(mockedAction.payload.listPost).toHaveLength(mockPostList.length)
    expect(mockedAction.payload.listPost[0]).toEqual(mockPostList[0])
  })

  test('setPostDetails', () => {
    const mockedAction = setPostDetails(mockPostDetails)

    expect(mockedAction.type).toEqual("SET_POST_DETAILS")
    expect(mockedAction.payload.post).toEqual(mockPostDetails)
    expect(mockedAction.payload.post.comments[1].id).toEqual(mockPostDetails.comments[1].id)
  })
  test('setPostIdForDetails', () => {
    const mockPostId = 'ononwfiwf8qwh-f84th90h93hg-83hg'
    const mockedAction = setPostIdForDetails(mockPostId)

    expect(mockedAction.type).toEqual("SET_POST_ID_FOR_DETAILS")
    expect(mockedAction.payload.postId).toBeDefined()
    expect(mockedAction.payload.postId).toEqual(mockPostId)
  })
})