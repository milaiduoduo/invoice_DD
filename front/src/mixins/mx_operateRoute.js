export default {
  beforeRouteEnter(to, from, next) {
    console.log("from:", from);
    let queryCondition;
    next(vm => {
      vm.pageFromName = from.name;
      switch (vm.pageFromName) {
        case "invoiceBlueFrom":
          vm.formData.queryOrderId = from.params.orderId;
          //console.log("重新查询：", vm.pageFromName);
          vm._onQuery();
          break;
        case "blueIvcDetail":
          console.log("vm:::", vm);
          //vm.$children[0] 因为是子控件
          queryCondition = vm.$utils.getLocalStorages("queryCondition");
          if (!queryCondition) break;
          queryCondition = JSON.parse(queryCondition.queryCondition);
          console.log("钩子函数中构造查询条件：", queryCondition)
          vm.$children[0].$children[0].$children[0].queryFormData = queryCondition;
          vm.$children[0]._queryIvcData(queryCondition);
          break;
        case "redIvcDetail":
          console.log("vm:::", vm);
          queryCondition = vm.$utils.getLocalStorages("queryCondition");
          if (!queryCondition) break;
          queryCondition = JSON.parse(queryCondition.queryCondition);
          console.log("钩子函数中构造查询条件：", queryCondition)
          vm.$children[0].$children[0].$children[0].queryFormData = queryCondition;
          vm.$children[0]._queryIvcData(queryCondition);
          break;
        case "invoiceRedForm":
          console.log("vm:::", vm);
          queryCondition = vm.$utils.getLocalStorages("queryCondition");
          if (!queryCondition) break;
          queryCondition = JSON.parse(queryCondition.queryCondition);
          console.log("钩子函数中构造查询条件：", queryCondition)
          vm.$children[0].$children[0].$children[0].queryFormData = queryCondition;
          vm.$children[0]._queryIvcData(queryCondition);
          break;
        default:
          break;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("离开去的页面名字：", to.name);
    if (to.name != "blueIvcDetail" && to.name != "redIvcDetail" && to.name != "invoiceRedForm") {
      //离开页面删除queryCondition
      console.log("离开页面删除queryCondition");
      this.$utils.removeLocalStorage("queryCondition")
    }
    next();
  }
}
