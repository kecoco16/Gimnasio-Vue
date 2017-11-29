import gimnasioService from './gimnasio'

const deleteClients = {}

deleteClients.search = q => gimnasioService.delete(`deleteClient/${q}`, {})
  .then(res => res.data)
  .catch(err => err)

export default deleteClients
