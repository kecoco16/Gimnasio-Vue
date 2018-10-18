import { post } from './utils'

const login = async (name, password) => {
  try {
    const token = await post('login', { name, password })
    return token
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default login
