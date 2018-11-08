<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <!-- <span>查询条件：发票类型, 订单号，发票代码，发票号，开票日期段，</span> -->
          <section>
            <el-form ref="queryform" size="mini" label-width="100px">
                 <el-row>
                     <el-col :span="5">
                         <el-form-item label="发票类型：">
                             <el-select v-model="queryInvoiceType" placeholder="请选择">
                                <el-option
                                    v-for="item in invoiceTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="订单编号：">
                            <el-input placeholder="请输入订单编号"></el-input>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="发票代码：">
                            <el-input placeholder="请输入发票代码"></el-input>
                         </el-form-item>
                     </el-col>
                     
                     <el-col :span="2">
                            <el-button class="queryBtn" type="primary" size="small" @click="onQuery">查询</el-button>
                     </el-col>
                 </el-row>
                 <el-row>
                     <el-col :span="10">
                         <el-form-item label="开票日期：">
                             <el-date-picker  type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="发票号码：">
                            <el-input placeholder="请输入发票号码"></el-input>
                         </el-form-item>
                     </el-col>
                 </el-row>
            </el-form>
          </section>
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
        <div class="pagination top">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page = "currentPage"
                :page-sizes="[10,30,50,100]"
                :page-size="100"
                layout="total,sizes,prev,pager,next,jumper"
                :total="400">
            </el-pagination>
        </div>
        <el-table :data="queryResult" style="width:100%" height="50%">
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="100"></el-table-column>
            <el-table-column fixed prop="ivcTitle" label="抬头" width="200"></el-table-column>
            <el-table-column fixed prop="invoiceType" label="发票类型" width="80"></el-table-column>
            <el-table-column fixed prop="invoiceNo" label="发票号码" width="120"></el-table-column>
            <el-table-column fixed prop="invoiceCode" label="发票代码" width="150"></el-table-column>
            <el-table-column fixed prop="invoiceTime" label="开票时间" width="100"></el-table-column>
            <el-table-column fixed prop="totalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column fixed prop="drawer" label="开票人" width="80"></el-table-column>
            <el-table-column fixed label="操作" width="100">
               <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showDetail(2)">查看详情</el-button>
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
    ivcTitle: "艾维尔集团有限公司",
    invoiceType: "1",
    invoiceCode: "065001008001",
    invoiceNo: "00999111",
    invoiceTime: "2018-6-3",
    totalPrice: "3000.69",
    drawer: "小明"
  },
  {
    orderId: "100000000",
    invoiceType: "1",
    invoiceCode: "065001008001",
    invoiceNo: "00999112",
    ivcTitle: "艾维尔集团有限公司",
    totalPrice: "30.69",
    invoiceTime: "2018-6-3",
    drawer: "小明"
  },
  {
    orderId: "100000000",
    ivcTitle: "艾维尔集团有限公司",
    invoiceType: "2",
    invoiceCode: "065001008021",
    invoiceNo: "00999121",
    invoiceTime: "2018-6-3",
    totalPrice: "3000.69",
    drawer: "小明"
  }
];
let config = {
  ivcType: {
    blue: 1,
    red: 2
  }
};
export default {
  data() {
    return {
      queryResult: mockData,
      currentPage: 1,
      queryInvoiceType: 0,
      invoiceTypeOptions: [
        {
          value: 0,
          label: "所有"
        },
        {
          value: 1,
          label: "蓝票"
        },
        {
          value: 2,
          label: "红票"
        }
      ]
    };
  },
  methods: {
    showDetail(ivcType) {
      if (ivcType === config.ivcType.blue) {
        this.$router.push({
          name: "blueIvcDetail",
          params: { invoiceNo: "1111" }
        });
      } else {
        this.$router.push({
          name: "redIvcDetail",
          params: { invoiceNo: "2222" }
        });
      }
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
.pagination.top {
  padding: 5px 20px 10px 20px;
  margin: -15px 10px 10px 10px;
  // border-top: 1px dashed #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
