const dateFormat = {}

const editarFecha = fecha => {
  const arrayFecha = fecha.split('-')
  const dia = arrayFecha[2]
  const mes = arrayFecha[1]
  const anio = arrayFecha[0]
  return dia + '-' + mes + '-' + anio
}

dateFormat.install = Vue => {
  Vue.filter('dateFormat', (val) => {
    return editarFecha(val)
  })
}

export default dateFormat
