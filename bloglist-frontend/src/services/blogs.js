import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const addLike = async (blog) => {
  ++blog.likes
  const updated = await axios.put(`/api/blogs/${blog.id}`, blog)
  return updated.data
}

const removeBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.delete(`/api/blogs/${blog.id}`, config)
}

export default { getAll, setToken, create, addLike, removeBlog }