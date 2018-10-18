import { get } from './utils'

const memberships = async () => {
  try {
    const getMemberships = await get('getMemberships')
    return getMemberships
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default memberships
