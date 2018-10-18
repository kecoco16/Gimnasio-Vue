import { constants, getHeaders } from './config'

// Get from rest endpoint.
export const get = endpoint => {
  return new Promise(async (resolve, reject) => {
    try {
      const method = 'GET'
      const request = await window.fetch(`${constants.baseUrl}/${endpoint}`, {
        method,
        headers: getHeaders(endpoint, method)
      })

      if (!request.ok) {
        const { error } = await request.json()
        const { code } = error
        throw new Error(code)
      }

      const response = await request.json()
      resolve(response)
    } catch (err) {
      if (!err.message || err.message === 'Network request failed') {
        return reject(new Error('w-0-0-0').message)
      }

      reject(err.message)
    }
  })
}

// Post to a rest endpoint.
export const post = (endpoint, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const method = 'POST'
      const request = await window.fetch(`${constants.baseUrl}/${endpoint}`, {
        method,
        body: JSON.stringify(data),
        headers: getHeaders(endpoint, method)
      })

      if (!request.ok) {
        const { error } = await request.json()
        const { code } = error
        throw new Error(code)
      }

      const response = await request.json()
      resolve(response)
    } catch (err) {
      if (!err.message || err.message === 'Network request failed') {
        return reject(new Error('w-0-0-0').message)
      }

      reject(err.message)
    }
  })
}
