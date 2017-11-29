import trae from 'trae'
import configService from './config'

const gimnasioService = trae.create({
  baseUrl: configService.apiUrl
})

export default gimnasioService
