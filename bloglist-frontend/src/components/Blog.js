import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setB }) => {
  const [short, setShort] = useState(true)

  const handleLike = async ( blog ) => {
    await blogService.addLike(blog)
    setShort(true)
    setB(blogs.sort((a, b) => a.likes - b.likes))
    setShort(false)
  }

  const handleDelete = async ( blog ) => {
    if (window.confirm(`Remove blog: ${blog.title}`)) {
      await blogService.removeBlog(blog)
      const lista = blogs.filter(b => b.id !== blog.id)
      setB(lista)
    }
  }

  if (short) {
    return (
      <div className='shortView' onClick={() => { setShort(false) }} >
        {blog.title} {blog.author}
      </div>
    )
  } else {
    return (
      <div className='longView' >
        <p onClick={() => { setShort(true) }}>{blog.title} {blog.author}</p>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={() => { handleLike(blog) }} >like</button></p>
        <p>added by {blog.user.username}</p>
        <button onClick={() => { handleDelete(blog) }} >Delete</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setB: PropTypes.func.isRequired
}

export default Blog