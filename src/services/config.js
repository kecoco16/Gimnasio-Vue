// Constants values for services.
export const constants = {
  baseUrl: process.env.API_URL || 'http://localhost:3000/api',
  baseUploadsURL: process.env.API_UPLOADS_URL || 'http://localhost:3000/'
}

// Get auth headers
export const getHeaders = (endpoint, method) => {
  if (method === 'GET') {
    return {
      'Authorization': window.localStorage.auth
    }
  }
  if (method === 'POST' && endpoint !== 'login') {
    return {
      'Content-Type': 'application/json',
      'Authorization': window.localStorage.auth
    }
  }
  return {
    'Content-Type': 'application/json'
  }
}
