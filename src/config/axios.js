import axios from 'axios'

const clientAxios = axios.create({
  baseURL: 'http://localhost:4000/',
})
clientAxios.defaults.timeout = 8000;

export default clientAxios