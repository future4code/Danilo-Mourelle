import React from 'react'
import { shallow } from 'enzyme'
import { Post, FaWrapper } from './index'

const mockContentPost = {
  "userVoteDirection": -1,
  "id": "0COaXIBbosGCvdIMNv9Y",
  "username": "SeiLa",
  "createdAt": 1585748516971,
  "title": "Atirei o pau no gato!",
  "votesCount": 5,
  "commentsCount": 15,
  "text": "E ele morreu!"
}
const mockPostDetails = {
  "userVoteDirection": 0,
  "id": "6wdZIq1fQug5QSFWscBn",
  "username": "AstroDev",
  "createdAt": 1585947892263,
  "text": "aaaa"
}



describe("Teste do componente Post recebendo post", () => {
  test('Click comments', () => {
    const mockClickCommentFunction = jest.fn()

    const component = shallow(
      <Post content={mockContentPost} onClickComment={mockClickCommentFunction} />
    )
    const actionsBtns = component.find(FaWrapper)

    expect(actionsBtns).toHaveLength(3)
    actionsBtns.at(2).simulate('click')
    expect(mockClickCommentFunction).toHaveBeenCalledTimes(1)
  })
  test('Click vote Post like', () => {
    const mockClickLikeFunction = jest.fn()

    const component = shallow(
      <Post content={mockContentPost} onClickLike={mockClickLikeFunction} />
    )
    const actionsBtns = component.find(FaWrapper)

    expect(actionsBtns).toHaveLength(3)
    actionsBtns.at(0).simulate('click')
    expect(mockClickLikeFunction).toHaveBeenCalledTimes(1)
  })
  test('Click vote Post dislike', () => {
    const mockClickDislikeFunction = jest.fn()

    const component = shallow(
      <Post content={mockContentPost} onClickDislike={mockClickDislikeFunction} />
    )
    const actionsBtns = component.find(FaWrapper)

    expect(actionsBtns).toHaveLength(3)
    actionsBtns.at(1).simulate('click')
    expect(mockClickDislikeFunction).toHaveBeenCalledTimes(1)
  })
})

describe('Teste do componente Post recebendo post detalhado', () => {
  test('Click comments', () => {

    const component = shallow(
      <Post content={mockPostDetails} />
    )
    const actionsBtns = component.find(FaWrapper)

    expect(actionsBtns).toHaveLength(2)
  })
  test('Click vote Post like', () => {
    const mockClickLikeFunction = jest.fn()

    const component = shallow(
      <Post content={mockPostDetails} onClickLike={mockClickLikeFunction} />
    )
    const actionsBtns = component.find(FaWrapper)

    actionsBtns.at(0).simulate('click')
    expect(mockClickLikeFunction).toHaveBeenCalledTimes(1)
  })
  test('Click vote Post like', () => {
    const mockClickDislikeFunction = jest.fn()

    const component = shallow(
      <Post content={mockPostDetails} onClickDislike={mockClickDislikeFunction} />
    )
    const actionsBtns = component.find(FaWrapper)

    actionsBtns.at(1).simulate('click')
    expect(mockClickDislikeFunction).toHaveBeenCalledTimes(1)
  })
})
