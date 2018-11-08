<template>
<div class="queryBlueWrap">
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <span class="sectionTitle">第一步：用订单号查询，以电子发票开票的订单.</span>
          <!-- 查询还未上传任何电子发票的订单,【数据从订单数据来】 -->
             <!-- <span>查询条件：订单号，XX时间段</span> -->
             <el-form ref="queryform" size="mini" label-width="80px">
                 <el-row>
                     <el-col :span="8">
                         <el-form-item label="订单编号">
                            <el-input placeholder="请输入订单编号"></el-input>
                         </el-form-item>
                     </el-col>
                     <el-col :span="2">
                            <el-button class="queryBtn" type="primary" size="small" @click="onQuery">查询</el-button>
                     </el-col>
                 </el-row>
             </el-form>
		    </div>
        
        <section><span class="sectionTitle">订单信息查询结果：</span></section>
        <el-table border :data="queryResult" style="width:100%" height="50%">
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="100"></el-table-column>
            <el-table-column  prop="consigneeInfo" label="收货人基本信息" width="200"></el-table-column>
            <el-table-column  prop="orderStartTime" label="下单时间" width="100"></el-table-column>
            <el-table-column  prop="orderTotalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toBlueInvoice(scope.row)">录入蓝票</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page = "currentPage"
                :page-sizes="[10,30,50,100]"
                :page-size="1"
                layout="total,sizes,prev,pager,next,jumper"
                :total="1">
            </el-pagination>
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    let mockData = [
      {
        orderId: "100000000",
        consigneeInfo: "艾维尔集团有限公司",
        orderStartTime: "2018-6-3",
        orderTotalPrice: "999.96"
      }
    ];
    return {
      currentPage: 1,
      queryResult: mockData
    };
  },
  methods: {
    toBlueInvoice(row) {
      this.$router.push({ name: "invoiceBlueFrom" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onQuery() {
      //调查询接口查询“以电子发票开票的订单”
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
.el-form-item__content {
  margin-left: 40px !important;
}
.queryBlueWrap {
  .sectionTitle {
    display: block;
    padding-bottom: 11px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    font-weight: bold;
  }
  .queryBtn {
    position: absolute;
    top: -3px;
    margin-left: 40px;
    padding: 9px 30px;
    font-size: 14px;
  }
  .pagination {
    padding: 5px 20px 10px 20px;
    margin: 10px;
    // border-top: 1px dashed #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
