import axios, { AxiosInstance } from 'axios'

export function setInterceptors (instance: AxiosInstance) {
  instance.interceptors.request.use(
    function (config) {
      // axios.defaults.headers.common.Authorization = localStorage.getItem('token')
      // config.headers.Authorization = 'Bearer ' + localStorage.getItem('MALRANG_TOKEN') || null
      config.headers.Authorization = localStorage.getItem('MALRANG_TOKEN') || null
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      // console.log(`${response.config.url}`, response)
      if (response.data?.token) {
        // console.log('response.data?.token : ', response.data?.token)
        localStorage.setItem('MALRANG_TOKEN', response.data?.token)
      } else {
        localStorage.removeItem('MALRANG_TOKEN')
      }
      return response
    },
    function (error) {
      // const response = { success: false, msg: error.message }
      // return response
      // alert('에러')
      // return error
      console.log('error : ', error)
      // window.location.href = '/error'
      return Promise.reject(error)
    }
  )
  return instance
}

// const apiRootPath = 'http://localhost:3000';
const apiRootPath = '/api'

function createInstance () {
  const instance: AxiosInstance = axios.create({
    baseURL: apiRootPath
  })
  return setInterceptors(instance)
}

export const axiosInstance = createInstance()
