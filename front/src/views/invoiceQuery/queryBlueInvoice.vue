<template>
 <div class="queryBlueWrap">
     <el-card>
         <div slot="header" class="headerWrap clearfix">
            <span class="sectionTitle">第一步：查询需要冲红的蓝票.</span>
             <!-- <h3>红票查询第一步：查询已上传的蓝票（相同的订单号可对应多张已上传的蓝票）</h3> -->
            <section class="queryWrap">
            <query-ivc-form :blueOnly="true" @showQueryCondition="_getQueryConditions"></query-ivc-form>
            </section>
         </div>
         <div class="pagination top">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page = "currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="queryTotal">
            </el-pagination>
        </div>
        <el-table :data="queryResult" border stripe style="width:100%" height="300px">>
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="120"></el-table-column>
            <el-table-column  prop="invoiceTitle" label="抬头" width="240"></el-table-column>
            <el-table-column  prop="invoiceNo" label="蓝票号码" width="100"></el-table-column>
            <el-table-column  prop="invoiceCode" label="蓝票代码" width="120"></el-table-column>
            <el-table-column  label="开票时间" width="100">
              <template slot-scope="scope">
                {{scope.row.invoiceTime?scope.row.invoiceTime.split("T")[0]:""}}
              </template>
            </el-table-column>
            <el-table-column prop="totalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column prop="drawer" label="开票人" width="80"></el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
               <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toRedInvoiceForm({orderId:scope.row.orderId,invoiceCode:scope.row.invoiceCode,invoiceNo:scope.row.invoiceNo})">冲红录入</el-button>
                    <el-button type="text" size="small" @click="_showDetail(scope.row)">查看蓝票</el-button>
                </template>
            </el-table-column>
            <!-- <el-table-column fixed label="详情查看" width="100"></el-table-column> -->
        </el-table>
     </el-card>
 </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import queryIvcForm from "@/components/queryForm/queryUploadIvcForm.vue";
import { parseTime } from "@/utils";
import config from "@/config/paramsConfig";
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
      pageSizes: [10, 30, 50, 100],
      pageSize: 10,
      currentPage: 1,
      queryTotal: 0,
      currentPage: 1,
      queryResult: []
    };
  },
  components: {
    [queryIvcForm.name]: queryIvcForm
  },
  methods: {
    _getQueryConditions(queryObj) {
      //调数据服务器蓝票查询接口
      // console.log("父组件收到查询条件：", queryObj);
      let queryData = {
        orderId: queryObj.orderId,
        invoiceType: queryObj.selectedInvoiceType,
        invoiceCode: queryObj.invoiceCode,
        invoiceNo: queryObj.invoiceNo,
        invoiceTimeStart: !queryObj.invoiceTimeGap
          ? ""
          : queryObj.invoiceTimeGap.length > 1
            ? parseTime(queryObj.invoiceTimeGap[0], "{y}-{m}-{d}")
            : "",
        invoiceTimeEnd: !queryObj.invoiceTimeGap
          ? ""
          : queryObj.invoiceTimeGap.length > 1
            ? parseTime(queryObj.invoiceTimeGap[1], "{y}-{m}-{d}")
            : "",
        PageInfo: {
          PageSize: this.pageSize,
          PageCurrent: this.currentPage
        }
      };
      axios
        .post("/dataApis/api/invoice", queryData)
        .then(res => {
          // console.log("蓝票查询结果:", res);
          //if (!res || !res.data || !res.data.data || res.data.code != 0) return;
          this.queryResult = Array.isArray(res.data.data) ? res.data.data : [];
          this.queryTotal = res.data.total;
          console.log("蓝票查询结果数据：", this.queryResult);
        })
        .catch(err => {
          console.log("蓝票查询出错：", err);
        });
    },
    _showDetail(rowObj) {
      let invoiceType = rowObj.invoiceType;
      if (invoiceType === config.ivcType.blue.key) {
        this.$router.push({
          name: "blueIvcDetail",
          params: {
            ...rowObj
          }
        });
      } else if (invoiceType === config.ivcType.red.key) {
        this.$router.push({
          name: "redIvcDetail",
          params: {
            ...rowObj
          }
        });
      }
    },
    toRedInvoiceForm(...requiredItem) {
      //requiredItem 是数组，所以需要先[0]，再使用扩展运算发展开
      let obj = {
        name: "invoiceRedForm",
        params: { ...requiredItem[0] }
      };
      console.log("红票传参：", obj);
      this.$router.push(obj);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.testClass {
  background: red;
}
.el-row:nth-last-of-type(1) {
  .el-form-item--mini.el-form-item:nth-last-of-type(1),
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
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
    &.top {
      padding-top: 0px;
      margin: -10px 10px 10px 10px;
    }
  }
}
</style>
