import gimnasioService from './gimnasio'

const deleteClients = {}

deleteClients.search = async q => {
  const clientDelete = await gimnasioService.delete(`deleteClient/${q}`, {})
  if (clientDelete) {
    return clientDelete.data
  } else {
    console.log(err => err)
  }
}

export default deleteClients
