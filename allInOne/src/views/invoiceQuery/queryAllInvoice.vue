<template>
<div>
  <m-query-invoice :blueOnlyFlag="false"></m-query-invoice>
</div>
</template>

<script type="text/ecmascript-6">
import queryInvoiceCom from "@/views/invoiceQuery/queryInvoiceCom";
import mx_operateRoute from "@/mixins/mx_operateRoute.js";
export default {
  mixins: [mx_operateRoute],
  components: {
    [queryInvoiceCom.name]: queryInvoiceCom
  }
  // created() {
  //   let test = this.$utils.getLocalStorages("queryCondition");
  //   console.log("get localstoage:", test);
  // }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
