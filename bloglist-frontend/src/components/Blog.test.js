import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('default view of blogs is their title and author but clicking the title shows all info', () => {
    const blogs = []
    const setB = () => {}
    const blog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
        likes: 1,
        user: {
            username: 'testUser'
        }
    }

    const component = render(
        <Blog blog={blog} blogs={blogs} setB={setB} />
    )

    const div = component.container.querySelector('.shortView')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent('testTitle testAuthor')
    expect(div).not.toHaveTextContent('testUrl')

    fireEvent.click(div)

    const longDiv = component.container.querySelector('.longView')
    expect(longDiv).toBeDefined()
    expect(longDiv).toHaveTextContent('testTitle testAuthor')
    expect(longDiv).toHaveTextContent('testUrl')
    expect(longDiv).toHaveTextContent('testUser')
})