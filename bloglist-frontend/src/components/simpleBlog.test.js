import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './simpleBlog'

afterEach(cleanup)

test('render given blogs title, author and likes', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        likes: 3
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const divTA = component.container.querySelector('.authorAndTitle')
    const divL = component.container.querySelector('.likes')

    expect(divTA).toHaveTextContent(
        'testTitle testAuthor'
    )

    expect(divL).toHaveTextContent(
        'blog has 3 likes'
    )
})

test('double clicking button calls the eventListener twice', () => {
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        likes: 3
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})