export default {
  beforeRouteEnter(to, from, next) {
    console.log("from:", from);
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
          vm.$children[0]._queryIvcData();
          break;
        case "redIvcDetail":
          console.log("from redIvcDetail:",
            from.params)
          vm.$children[0]._queryIvcData();
          break;
        default:
          break;
      }
    });
  }
}
