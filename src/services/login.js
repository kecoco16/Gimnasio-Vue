import { post } from './utils'

const login = async (name, password) => {
  try {
    const token = await post('login', { name, password })
    return token
  } catch (error) {
    console.log(error)
  }
}

export default login
