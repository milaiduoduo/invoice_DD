    export function getHx_kp_config(vm) {
      let configObjWrap = vm.$utils.getLocalStorage("hx_kp_config");
      //   console.log("vm:", vm);
      if (!configObjWrap) {
        vm.$showMessage(
          "配置文件读取异常，请退出系统，重新登录获取！",
          "error"
        );
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
