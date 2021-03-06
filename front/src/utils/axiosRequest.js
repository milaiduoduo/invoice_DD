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

const put = (url, data, config = {}) => {
  return axios_ins.put(url, data, config)
}

const all = ([]) => {
  return axios_ins.all([]);
}

export default {
  install(vm) {
    vm.prototype.$reqGet = get;
    vm.prototype.$reqPost = post;
    vm.prototype.$reqPut = put;
    vm.prototype.$reqAll = function () {
      console.log("我是axios封装方法all");
    };
  }
}
// export {
//   get,
//   post,
//   all
// };
