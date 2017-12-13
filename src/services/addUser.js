import gimnasioService from './gimnasio'

const addUser = {}

addUser.search = async (name, pass) => {
  const newUser = await gimnasioService.post('newUser', {
    name,
    pass
  })
  if (newUser) {
    return newUser.data
  } else {
    console.log(err => err)
  }
}

export default addUser
