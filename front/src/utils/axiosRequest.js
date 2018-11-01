import axios_ins from './request';

const get = (url, params, config = {}) => {
  return axios_ins.get(url, {
    params: params,
    ...config
  })
}

const post = (url, data, config = {}) => {
  return axios_ins.post(url, data, config)
}

export default {
  install(vm) {
    vm.prototype.$reqGet = get;
    vm.prototype.$reqPost = post;
  }
}