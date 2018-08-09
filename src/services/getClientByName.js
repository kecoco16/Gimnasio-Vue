import { get } from './utils'

const clientByName = async (name) => {
  try {
    const clients = await get(`searchClient/${name}`, {})
    return clients
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default clientByName
