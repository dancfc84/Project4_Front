const devUrl = '/api'
const prodUrl = "https://b00k-exchange.herokuapp.com/api"

const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl

export default baseUrl