<template>
 <div class="queryBlueWrap">
   <m-query-invoice :blueOnlyFlag="true">
     <span slot="headerTitle" class="sectionTitle">第一步：查询需要冲红的蓝票.</span>
   </m-query-invoice>
 </div>
</template>

<script type="text/ecmascript-6">
import queryInvoiceCom from "@/views/invoiceQuery/queryInvoiceCom";
import mx_operateRoute from "@/mixins/mx_operateRoute";

export default {
  mixins: [mx_operateRoute],
  components: {
    [queryInvoiceCom.name]: queryInvoiceCom
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
// .queryBlueWrap {
.sectionTitle {
  display: block;
  padding-bottom: 11px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  font-weight: bold;
}
// .queryBtn {
//   position: absolute;
//   top: -3px;
//   margin-left: 40px;
//   padding: 9px 30px;
//   font-size: 14px;
// }
// .el-row:nth-last-of-type(1) {
//   .el-form-item--mini.el-form-item:nth-last-of-type(1),
//   .el-form-item--small.el-form-item {
//     margin-bottom: 0px;
//   }
// }
// }
</style>
