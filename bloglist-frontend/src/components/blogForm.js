import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ title, author, url, likes, handleCreateBlog }) => {
  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        Title
        <input {...title} />
      </div>
      <div>
        Author
        <input {...author} />
      </div>
      <div>
        URL
        <input {...url} />
      </div>
      <div>
        Likes
        <input {...likes} />
      </div>
      <button type="submit">Luo</button>
    </form>
  )
}

BlogForm.propTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  likes: PropTypes.object.isRequired,
  handleCreateBlog: PropTypes.func.isRequired
}

export default BlogForm