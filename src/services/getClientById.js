import { get } from './utils'

const clientById = async id => {
  try {
    const client = await get(`getClient/${id}`, {})
    return client
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default clientById
