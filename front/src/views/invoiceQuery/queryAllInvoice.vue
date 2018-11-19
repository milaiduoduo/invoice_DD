<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <!-- <span>查询条件：发票类型, 订单号，发票代码，发票号，开票日期段，</span> -->
          <section class="queryWrap">
            <query-ivc-form :blueOnly="false" @showQueryCondition="_getQueryConditions"></query-ivc-form>
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
        <el-table border stripe :data="queryResult" style="width:100%" height="300px">
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="120"></el-table-column>
            <el-table-column fixed prop="invoiceTitle" label="抬头" width="240"></el-table-column>
            <el-table-column fixed prop="invoiceType" label="发票类型" width="80">
              <template slot-scope="scope">
                <!-- 注意事项，在这个位置无法使用直接引用进来的变量，需要把变量赋值到vue的实例变量中才能使用 -->
                {{scope.row.invoiceType==ivcType.blue.key?ivcType.blue.name:ivcType.red.name}}
              </template>
            </el-table-column>
            <el-table-column fixed prop="invoiceNo" label="发票号码" width="100"></el-table-column>
            <el-table-column fixed prop="invoiceCode" label="发票代码" width="120"></el-table-column>
            <el-table-column fixed prop="invoiceTime" label="开票时间" width="100">
              <template slot-scope="scope">
                {{scope.row.invoiceTime?scope.row.invoiceTime.split("T")[0]:""}}
              </template>
            </el-table-column>
            <el-table-column fixed prop="totalPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column fixed prop="drawer" label="开票人" width="80"></el-table-column>
            <el-table-column fixed label="操作" width="100">
               <template slot-scope="scope">
                    <el-button type="text" size="small" @click="_showDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import queryIvcForm from "@/components/queryForm/queryUploadIvcForm.vue";
import { parseTime } from "@/utils";
import axios from "axios";
import config from "@/config/paramsConfig";
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

export default {
  components: {
    [queryIvcForm.name]: queryIvcForm
  },
  data() {
    return {
      pageSizes: [10, 30, 50, 100],
      pageSize: 10,
      currentPage: 1,
      queryTotal: 0,
      currentPage: 1,
      queryResult: [],
      ivcType: config.ivcType
    };
  },
  created() {
    console.log("config:", config.ivcType.blue.name);
  },
  methods: {
    _getQueryConditions(queryObj) {
      //调数据服务器发票查询接口
      // console.log("父组件收到查询条件：", queryObj);
      let queryData = {
        orderId: queryObj.orderId,
        invoiceType: queryObj.selectedInvoiceType
          ? queryObj.selectedInvoiceType
          : "",
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
          console.log("票据查询结果数据：", this.queryResult);
        })
        .catch(err => {
          console.log("票据查询出错：", err);
        });
    },
    _showDetail(rowObj) {
      console.log("rowObj:", rowObj);
      let invoiceType = rowObj.invoiceType;
      if (invoiceType === config.ivcType.blue.key) {
        this.$router.push({
          path: `/blueIvcDetail/${rowObj.orderId}/${rowObj.invoiceCode}/${
            rowObj.invoiceNo
          }`
        });
        // this.$router.push({
        //   name: "blueIvcDetail",
        //   params: {
        //     ...rowObj
        //   }
        // });
      } else if (invoiceType === config.ivcType.red.key) {
        console.log("rowObj:", rowObj);
        this.$router.push({
          path: `/redIvcDetail/${rowObj.orderId}/${rowObj.blueInvoiceCode}/${
            rowObj.blueInvoiceNo
          }/${rowObj.invoiceCode}/${rowObj.invoiceNo}`
          //invoiceCode,pdfInfo,invoiceTime
        });
      }
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
