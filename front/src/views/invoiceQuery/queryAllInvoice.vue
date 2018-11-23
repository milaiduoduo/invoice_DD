<template>
<div>
  <m-query-invoice :blueOnlyFlag="false"></m-query-invoice>
</div>
</template>

<script type="text/ecmascript-6">
import queryInvoiceCom from "@/views/invoiceQuery/queryInvoiceCom";
export default {
  components: {
    [queryInvoiceCom.name]: queryInvoiceCom
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
