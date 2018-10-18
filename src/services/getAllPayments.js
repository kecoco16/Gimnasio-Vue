import { get } from './utils'

const getAllPayments = async () => {
  try {
    const payments = await get(`getPayments`, {})
    return payments
  } catch (err) {
    console.log(err)
    return new Error(err)
  }
}

export default getAllPayments
