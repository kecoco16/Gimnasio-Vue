import { get } from './utils'

const users = async () => {
  try {
    const getUsers = await get('getUsers')
    return getUsers
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default users
