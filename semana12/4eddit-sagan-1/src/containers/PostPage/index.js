import React, { Component } from "react";
import styled from 'styled-components'
import { goBack, push } from "connected-react-router"
import { connect } from "react-redux"

import { getPostDetails, publishComments, votePost, voteComment, setPostDetails } from "../../actions";

import ButtonAppBar from "../../components/AppBar";
import { MyTextArea } from "../../components/input";
import ButtonStyle from "../../components/button"
import Post from "../../components/Post";
import { routes } from "../Router";

import { LongPageWrapper, LongContentWrapper, LongFormStyle, PostList } from '../style/styles'


class PostPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token === null) {
      this.props.goToLoginPage()
    } else {
      this.props.getPostDetails(this.props.postId)
    }
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    this.props.setPostDetails(undefined)
  }

  handleLikePost = (post) => {
    let currentVote = post.userVoteDirection

    if (currentVote === 1) {
      currentVote = 0
      this.props.votePost(post.id, currentVote)
    } else {
      currentVote = 1
      this.props.votePost(post.id, currentVote)
    }
  }

  handleDislikePost = (post) => {
    let currentVote = post.userVoteDirection
    if (currentVote === -1) {
      currentVote = 0
      this.props.votePost(post.id, currentVote)
    } else {
      currentVote = -1
      this.props.votePost(post.id, currentVote)
    }
  }

  handleInputValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.publishComments(this.props.post.id, this.state.text)
    this.setState({
      text: '',
    })
  }

  handleLike = (post, comment) => {
    let currentVote = comment.userVoteDirection
    if (currentVote === 1) {
      currentVote = 0
      this.props.voteComment(post.id, comment.id, currentVote)
    }
    else {
      currentVote = 1
      this.props.voteComment(post.id, comment.id, currentVote)
    }
  }

  handleDislike = (post, comment) => {
    let currentVote = comment.userVoteDirection
    if (currentVote === -1) {
      currentVote = 0
      this.props.voteComment(post.id, comment.id, currentVote)
    }
    else {
      currentVote = -1
      this.props.voteComment(post.id, comment.id, currentVote)
    }
  }

  render() {
    const { post } = this.props
    return (
      <LongPageWrapper>
        <ButtonAppBar
          pageName="Comentários da Timeline"
          btnText="Voltar"
          onClick={this.props.goBack}
        />
        <LongContentWrapper>
          <PostList>
            {post &&
              <Post
                content={post}
                onClickLike={() => this.handleLikePost(post)}
                onClickDislike={() => this.handleDislikePost(post)}
              />}
          </PostList>
          {post &&
            <LongFormStyle onSubmit={this.handleSubmit}>
              <MyTextArea
                type="text"
                name="text"
                label="Escreva seu comentário"
                required={true}
                onChange={this.handleInputValue}
                value={this.state.text}
              />
              <ButtonStyle
                btnText="Comentar"
                type="submit"
              />
            </LongFormStyle>
          }
          <PostList>
            {post ?
              post.comments.sort((a, b) => {
                return b.createdAt - a.createdAt
              })
                .map(cadaComentario => (
                  <Post
                    key={cadaComentario.id}
                    content={cadaComentario}
                    onClickLike={() => this.handleLike(post, cadaComentario)}
                    onClickDislike={() => this.handleDislike(post, cadaComentario)}
                  />
                )) :
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            }
          </PostList>
        </LongContentWrapper>
      </LongPageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.post,
  postId: state.posts.postId
})

const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
  goToLoginPage: () => dispatch(push(routes.login)),
  getPostDetails: (postId) => dispatch(getPostDetails(postId)),
  publishComments: (postId, text) => dispatch(publishComments(postId, text)),
  votePost: (postId, direction) => dispatch(votePost(postId, direction)),
  voteComment: (postId, commentId, direction) => dispatch(voteComment(postId, commentId, direction)),
  setPostDetails: (post) => dispatch(setPostDetails(post)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);