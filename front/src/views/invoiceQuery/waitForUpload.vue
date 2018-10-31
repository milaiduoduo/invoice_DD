<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <h3>蓝票查询第一步：查询还未上传任何电子发票的订单,【数据从订单数据来】</h3>
             <span>查询条件：订单号，XX时间段</span>
          <!-- <el-form ref="queryform" class="queryWrap" size="mini" label-width="100px">
                  <el-row>
                      <el-col :span="5">
                      <el-form-item label="发票类型:">
                          <el-checkbox-group class="checklistWrap" v-model="checkList">
                          <el-checkbox label="蓝票"></el-checkbox>
                          <el-checkbox label="红票"></el-checkbox>
                          </el-checkbox-group>
                      </el-form-item>
                      </el-col>
                      <el-col :span="8">
                      <el-form-item label="开票日期:">
                          <el-date-picker v-model="invoiceTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                      </el-form-item>
                      </el-col>
                      <el-col :span="7">
                      <el-form-item label="订单编号:">
                          <el-input placeholer="请输入订单编号"></el-input>
                      </el-form-item>
                      </el-col>
                      <el-col :span="3">
                      <el-button type="primary" size="small" class="queryBtn"  @click="onQuery">查询</el-button>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :offset="5" :span="8">
                      <el-form-item class="lastRow" label="发票代码:">
                          <el-input placeholer="请输入发票代码"></el-input>
                      </el-form-item>
                      </el-col>
                      <el-col :span="7">
                      <el-form-item class="lastRow" label="发票号码:">
                          <el-input placeholer="请输入发票号码"></el-input>
                      </el-form-item>
                      </el-col>
                  </el-row>
          </el-form> -->
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
        <el-table :data="queryResult" style="width:100%" height="50%">
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="100"></el-table-column>
            <el-table-column  prop="consigneeInfo" label="收货人基本信息" width="200"></el-table-column>
            <el-table-column  prop="orderStartTime" label="下单时间" width="100"></el-table-column>
            <el-table-column  prop="orderTotalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toBlueInvoice(scope.row)">录入蓝票</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
let mockData = [
  {
    orderId: "100000000",
    consigneeInfo: "艾维尔集团有限公司",
    orderStartTime: "2018-6-3",
    orderTotalPrice: "999.96"
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
    toBlueInvoice(row) {
      this.$router.push({ name: "invoiceBlueFrom" });
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
