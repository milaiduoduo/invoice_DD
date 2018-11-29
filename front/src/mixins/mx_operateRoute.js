export default {
  beforeRouteEnter(to, from, next) {
    // console.log("from:", from);
    let queryCondition, queryConditionForFrom;

    function setQueryCondition(vm) {
      queryCondition = vm.$utils.getLocalStorages("queryCondition");
      if (!queryCondition) return;
      queryConditionForFrom = JSON.parse(queryCondition.queryCondition);
      queryCondition = JSON.parse(queryCondition.queryCondition)
      // console.log("路由钩子得到的Form查询显示：", queryConditionForFrom);
      if (vm.$children[0].$children[0].$children[0].queryFormData) vm.$children[0].$children[0].$children[0].queryFormData = queryConditionForFrom;
      queryCondition.invoiceType = queryConditionForFrom.invoiceType == 0 ? "" : queryConditionForFrom.invoiceType;
      // console.log("queryConditionForFrom.invoiveTimeGap:", queryConditionForFrom, queryConditionForFrom.invoiceTimeGap);
      queryCondition.invoiceTimeStart = !queryConditionForFrom.invoiceTimeGap ? "" : queryConditionForFrom.invoiceTimeGap[0];
      queryCondition.invoiceTimeEnd = !queryConditionForFrom.invoiceTimeGap ? "" : queryConditionForFrom.invoiceTimeGap[1];

      // console.log("路由钩子得到的post参数：", queryCondition);
      vm.$children[0]._queryIvcData(queryCondition);
    };

    function toQueryOrder(vm) {
      vm.formData.queryOrderId = from.params.orderId;
      vm._onQuery();
    }
    next(vm => {
      vm.pageFromName = from.name;
      console.log("from page:", from);
      switch (vm.pageFromName) {
        case "invoiceBlueFrom":
          toQueryOrder(vm);
          break;
        case "blueIvcDetail":
          if (to.name == 'queryOrder') {
            toQueryOrder(vm);
            break;
          }
          setQueryCondition(vm);
          break;
        case "redIvcDetail":
          setQueryCondition(vm);
          break;
        case "invoiceRedForm":
          setQueryCondition(vm);
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
