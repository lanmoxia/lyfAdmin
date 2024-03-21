import requests from '@/api/request'

const useHttp = (config) => {
  return new Promise((resolve, reject) => {
    requests({
      url: config.url,
      method: config.method,
      data: config.data || {},
      params: config.params || {}
    })
    .then((resp) => {
      resolve(resp.data)
    }).
    catch((err) => {
      reject(err)
    })
  })
}

export default useHttp