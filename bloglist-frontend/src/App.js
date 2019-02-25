import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BForm from './components/blogForm'
import { useField } from './hooks/index'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('text')
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const uname = useField('text')
  const pword = useField('password')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes - b.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: uname.value,
        password: pword.value,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setErrorMessage('Kirjautuminen onnistui!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }
    try {
      const uusi = await blogService.create(newBlog)
      setBlogs(blogs.concat(uusi))
      setErrorMessage(`Blogin ${uusi.title} luonti onnistui!`)
      title.reset()
      author.reset()
      url.reset()
      likes.reset()
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Blogin luonti epäonnistui jostain syystä')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const listaaBlogit = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setB={setBlogs} />
      )}
    </div>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input {...uname} />
      </div>
      <div>
        salasana
        <input {...pword} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  const blogForm = () => {

    const hWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const sWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hWhenVisible} >
          <button onClick={() => setBlogFormVisible(true)} >Add blog</button>
        </div>
        <div style={sWhenVisible} >
          <BForm
            handleCreateBlog={handleCreateBlog}
            title={title}
            author={author}
            url={url}
            likes={likes}
          />
          <button onClick={() => setBlogFormVisible(false)} >cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className='appMainDiv' >
      <p>{errorMessage}</p>
      {user === null ?
        loginForm() :
        <div>
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={() => { handleLogout() }}>Logout</button>
            <div>{listaaBlogit()}</div>
          </div>
          <h2>Lisää blogi</h2>
          <div>{blogForm()}</div>
        </div>
      }
    </div>
  )
}

export default App