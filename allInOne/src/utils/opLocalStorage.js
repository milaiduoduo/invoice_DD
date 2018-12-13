    export function getHx_kp_config(vm, showErr = false) {
      let configObjWrap = vm.$utils.getLocalStorage("hx_kp_config");
      console.log("获取配置公共方法:", configObjWrap);
      if (!configObjWrap && showErr) {
        vm.$showMessage(
          "配置文件读取异常！请退出系统并重新登录，以初始化的配置信息！",
          "error"
        );
        return '';
      } else if (!configObjWrap) {
        return '';
      }
      let configObj = JSON.parse(configObjWrap);
      console.log("configObjWrap:", configObj);
      return {
        preBlueInvoiceCode: configObj.preBlueInvoiceCode,
        preRedInvoiceCode: configObj.preRedInvoiceCode,
        receiverTaxNo: configObj.receiverTaxNo,
        receiverName: configObj.receiverName,
      }
    };
