import gimnasioService from './gimnasio'

const getUser = {}

getUser.search = async (name, pass) => {
  const getUser = await gimnasioService.get(`user`, { params: { name, pass } })
  if (getUser) {
    return getUser.data
  } else {
    console.log(err => err)
  }
}

export default getUser
