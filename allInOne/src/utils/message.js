import {
  Message
} from 'element-ui';

function showMessage(msg, infoType, duration = 5000) {
  console.log("弹出信息为：");
  console.log(msg.toString());
  if (infoType == 'error') {
    duration = 0;
  }
  Message({
    showClose: true,
    message: msg,
    type: infoType,
    duration: duration
  })
}

export default {
  install: function (vm) {
    vm.prototype.$showMessage = showMessage;
  }
}
