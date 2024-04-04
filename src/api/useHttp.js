import requests from '@/api/request'

const useHttp = (config) => {
  const headers = config.headers || {};
  if (config.data instanceof FormData) {
    // 如果是 FormData，删除 Content-Type 以让浏览器自动设置
    delete headers['Content-Type'];
  }
  return new Promise((resolve, reject) => {
    requests({
      url: config.url,
      method: config.method,
      data: config.data || {},
      headers: headers,
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