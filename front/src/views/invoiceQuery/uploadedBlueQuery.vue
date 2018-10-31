<template>
 <div>
     <el-card>
         <div slot="header" class="headerWrap clearfix">
             <h3>红票查询第一步：查询已上传的蓝票（相同的订单号可对应多张已上传的蓝票）</h3>
             <span>查询条件：订单号，发票代码，发票号</span>
         </div>
         <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page = "currentPage"
                :page-sizes="[10,30,50,100]"
                :page-size="100"
                layout="total,sizes,prev,pager,next,jumper"
                :total="1">
            </el-pagination>
        </div>
        <el-table :data="queryResult" style="width:100%" height="50%">>
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="100"></el-table-column>
            <el-table-column fixed prop="ivcTitle" label="抬头" width="200"></el-table-column>
            <el-table-column fixed prop="invoiceNo" label="蓝票号码" width="120"></el-table-column>
            <el-table-column fixed prop="invoiceCode" label="蓝票代码" width="150"></el-table-column>
            <el-table-column fixed prop="invoiceTime" label="开票时间" width="100"></el-table-column>
            <el-table-column fixed prop="totalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column fixed prop="drawer" label="开票人" width="80"></el-table-column>
            <el-table-column fixed label="操作" width="200">
               <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toRedInvoice(scope.row)">冲红录入</el-button>
                    <el-button type="text" size="small">查看蓝票</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column fixed label="详情查看" width="100"></el-table-column> -->
        </el-table>
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
let mockData = [
  {
    orderId: "100000000",
    ivcTitle: "艾维尔集团有限公司",
    invoiceType: "蓝票",
    invoiceCode: "065001008000",
    invoiceNo: "00999111",
    invoiceTime: "2018-6-3",
    totalPrice: "3000.69",
    drawer: "小明",
    uploadFlag: "已上传(3)"
  },
  {
    orderId: "100000000",
    invoiceType: "蓝票",
    invoiceCode: "065001008000",
    invoiceNo: "00999112",
    ivcTitle: "艾维尔集团有限公司",
    totalPrice: "3000.69",
    invoiceTime: "2018-6-3",
    drawer: "小明",
    uploadFlag: "待上传"
  },
  {
    orderId: "100000000",
    invoiceType: "蓝票",
    invoiceCode: "065001008000",
    invoiceNo: "00999113",
    ivcTitle: "艾维尔集团有限公司",
    totalPrice: "3000.69",
    invoiceTime: "2018-6-3",
    drawer: "小明",
    uploadFlag: "待上传"
  }
];
export default {
  data() {
    return {
      currentPage: 1,
      queryResult: mockData
    };
  },
  methods: {
    toRedInvoice(row) {
      console.log(row);
      this.$router.push({ name: "invoiceRedForm" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onQuery() {}
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
