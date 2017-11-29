import gimnasioService from './gimnasio'

const payClients = {}

payClients.search = (q, fechaPago, fecha, mensualidad, nombre) => {
  return gimnasioService.post(`pago/${q}`, { 'fecha_pago': fechaPago, 'fecha': fecha, 'mensualidad': mensualidad, 'nombre': nombre })
    .then(res => res.data)
    .catch(err => err)
}

export default payClients
