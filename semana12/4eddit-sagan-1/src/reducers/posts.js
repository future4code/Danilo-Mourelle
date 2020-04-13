const initialState = {
  postList: [],
  post: undefined,
  postId:localStorage.getItem('postId')
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POST_LIST":
      return {
        ...state, postList: action.payload.listPost
      }
    case "SET_POST_DETAILS":
      return {
        ...state, post: action.payload.post
      }
      case "SET_POST_ID_FOR_DETAILS":
        localStorage.setItem('postId', action.payload.postId)
        return{
          ...state, postId: action.payload.postId
        }
    default:
      return {
        ...state
      }
  }
}

export default posts