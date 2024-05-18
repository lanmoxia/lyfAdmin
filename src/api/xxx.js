import server from './request'

const Get = (url, params = {}, config = {}) =>
  new Promise(resolve => {
    server
      .get(url, { ...config, params }) // 合并config和params
      .then(result => {
        let res = result.data
        if (config.clearFn) {
          res = config.clearFn(result.data) // 使用clearFn清洗数据
        }
        resolve([null, res])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })

const Post = (url, data, params = {}, config = {}) =>
  new Promise(resolve => {
    // 检查是否是文件上传，如果是，设置 'Content-Type' 为 'multipart/form-data'
    if (data instanceof FormData) {
      config.headers = {
        ...(config.headers), // 保留已有的headers
        'Content-Type': 'multipart/form-data' 
      }
    }
    server
      .post(url, data, { params, ...config })
      .then(result => {
        resolve([null, result.data])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })

const Put = (url, data, params = {}, config = {}) =>
  new Promise(resolve => {
    server
      .put(url, data, { params, ...config })
      .then(result => {
        resolve([null, result.data])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })

const Delete = (url, params = {}, config = {}) =>
  new Promise(resolve => {
    server
      .delete(url, { params, ...config })
      .then(result => {
        resolve([null, result.data])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })

const Patch = (url, data, params = {}, config = {}) =>
  new Promise(resolve => {
    server
      .patch(url, data, { params, ...config })
      .then(result => {
        resolve([null, result.data])
      })
      .catch(err => {
        resolve([err, undefined])
      })
  })

export { Get, Post, Put, Delete, Patch }
