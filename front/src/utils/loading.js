import {
  Loading
} from 'element-ui';
import _ from 'lodash';
let needLoadingRequestCount = 0;

let loadingInstance = {};

function startLoading() {
  let options = {
    text: '拼命的加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0.7)'
  };
  loadingInstance = Loading.service(options);
};

function endLoading() {
  loadingInstance.close();
}

function tryCloseLoading() {
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 300)()
  }
}

export {
  showFullScreenLoading,
  tryHideFullScreenLoading
}
