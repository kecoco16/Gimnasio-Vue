import gimnasioService from './gimnasio'

const payClients = {}

payClients.search = async (q, fechaPago, fecha, mensualidad, nombre) => {
  const pagos = await gimnasioService.post(`pago/${q}`, {
    'fecha_pago': fechaPago,
    fecha,
    mensualidad,
    nombre
  })
  if (pagos) {
    return pagos.data
  } else {
    console.log(err => err)
  }
}

export default payClients
