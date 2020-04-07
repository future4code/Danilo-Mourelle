import postsReducer from './posts'
import {
  setPost,
  setPostDetails,
  setPostIdForDetails
} from '../actions'

const mockInitialState = {
  postList: [
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
    }],
  post: {
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
  },
  postId: "4SIVI0M7H8IK78oYxXUI"
}

describe("Teste de Reducer que controlam o post", () => {
  test("SET_POST_LIST", () => {
    const mockNewList = [
      {
        "userVoteDirection": 0,
        "id": "92mvvUw7mz9dehVVZR1U",
        "votesCount": -2,
        "commentsCount": 2,
        "text": "testando",
        "username": "darvas",
        "createdAt": 1584741150555,
        "title": "AAAAAA"
      },
      {
        "userVoteDirection": 0,
        "id": "9c7OIK7fWBVtJR24ZaDw",
        "votesCount": 1,
        "commentsCount": 0,
        "text": "Partiu Netflix!!!",
        "username": "Pedro",
        "createdAt": 1586049718589,
        "title": "Domingo, dia da preguiça"
      },
    ]
    const newSetAction = setPost(mockNewList)
    const newStore = postsReducer(mockInitialState, newSetAction)

    expect(newStore.postList).toHaveLength(mockNewList.length)
    expect(newStore.postList).toEqual(mockNewList)
    expect(newStore.postList[1]).toEqual(mockNewList[1])
  })
  test("SET_POST_DETAILS", () => {
    const mockNewPost = {
      "comments": [
        {
          "userVoteDirection": 0,
          "id": "6wdZIq1fQug5QSFWscBn",
          "username": "AstroDev",
          "createdAt": 1585947892263,
          "text": "aaaa"
        },
        {
          "userVoteDirection": 0,
          "id": "KUnTbqKwsHZmlZRBzY8c",
          "username": "user",
          "createdAt": 1585942586647,
          "votesCount": -1,
          "text": "achei um baita post"
        },
        {
          "userVoteDirection": 0,
          "id": "S4JLqWgnyFBgpD2SdAw1",
          "text": "que post legal!",
          "username": "AstroDev",
          "createdAt": 1585937655977,
          "votesCount": 1
        }
      ],
      "userVoteDirection": 0,
      "id": "HMog4gFSGh47wPgZzPVF",
      "text": "Mussum Ipsum, cacilds vidis litro abertis. Viva Forevis aptent taciti sociosqu ad litora torquent. Mé faiz elementum girarzis, nisi eros vermeio. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.",
      "username": "AstroDev",
      "createdAt": 1585937549163,
      "title": "Mussum!",
      "votesCount": 3,
      "commentsCount": 3
    }
    const newSetDetailsAction = setPostDetails(mockNewPost)
    const newStore = postsReducer(mockInitialState, newSetDetailsAction)

    expect(newStore.post).toEqual(mockNewPost)
    expect(newStore.post.comments).toHaveLength(mockNewPost.comments.length)
    expect(newStore.post.comments[1].id).toEqual(mockNewPost.comments[1].id)
    expect(newStore.post.comments).toEqual(expect.not.arrayContaining(mockInitialState.post.comments))
  })
  test("SET_POST_ID_FOR_DETAILS", () => {
    const mockNewPostId = 'onvoqieuhoqnvoubqivoqjfpi97wg9q78wefgh07wg'
    const newSetPostIdAction = setPostIdForDetails(mockNewPostId)
    const newStore = postsReducer(mockInitialState, newSetPostIdAction)

    expect(newStore.postId).toEqual(mockNewPostId)
    expect(newStore.postId).toBeDefined()
    expect(newStore.postId).not.toEqual(mockInitialState.postId)
  })
  test("DEFAULT", () => {
    const mockNewPostId = 'onvoqieuhoqnvoubqivoqjfpi97wg9q78wefgh07wg'
    const newStore = postsReducer(mockInitialState, {type:'VAI_CAIR_NO_DEFAULT', payload:mockNewPostId})

    expect(newStore).toEqual(mockInitialState)
    expect(newStore.postId).toEqual(mockInitialState.postId)
  })
})