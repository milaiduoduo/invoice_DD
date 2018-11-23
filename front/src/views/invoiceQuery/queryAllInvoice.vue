<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <!-- <span>查询条件：发票类型, 订单号，发票代码，发票号，开票日期段，</span> -->
          <section class="queryWrap">
            <query-ivc-form :blueOnly="false" @showQueryCondition="onQuery"></query-ivc-form>
          </section>   
		    </div>
        <div class="pagination top">
          <el-button-group>
              <el-button ref="btnPre" type="primary" icon="el-icon-arrow-left" :disabled="btnPreDisabled" size="small" @click="onQueryByPageNum('pre')">上一页</el-button>
              <el-button ref="btnNext" type="primary" :disabled="btnNextDisabled"  size="small" @click="onQueryByPageNum('next')">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
            <!-- <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page = "currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total,sizes,prev,pager,next,jumper"
                :total="queryTotal">
            </el-pagination> -->
        </div>
        <el-table border stripe :data="queryResult" style="width:100%" height="300px">
            <el-table-column fixed prop="seq" label="序号" width="50">
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
// import axios from "axios";
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
      // pageSizes: [10, 30, 50, 100],
      pageSize: 10,
      currentPage: 1,
      queryTotal: 0,
      queryResult: [],
      ivcType: config.ivcType,
      queryCondition: {},
      btnPreDisabled: false,
      btnNextDisabled: false
    };
  },
  created() {
    this._btnDisabledStatus(true, true);
    console.log(this.btnPreDisabled, this.btnNextDisabled);
  },
  methods: {
    onQuery(queryObj) {
      //初始化this.currentPage == 1
      this.currentPage == 1;
      this.queryCondition = queryObj;
      // 父组件收到查询条件数据： queryObj
      // console.log("父组件收到查询条件：", queryObj);
      let queryData = this._makePostData();

      this._queryIvcData(queryData);
    },
    onQueryByPageNum(direction) {
      if (direction == "pre") {
        console.log("1.in pre this.currentPage:", this.currentPage);

        this.currentPage = Math.max(1, --this.currentPage);
        console.log("2.in pre this.currentPage:", this.currentPage);
      } else {
        this.currentPage++;
      }
      console.log("this.currentPage:", this.currentPage);
      let queryData = this._makePostData();
      this._queryIvcData(queryData);
    },
    _makePostData() {
      let queryData = {
        orderId: this.queryCondition.orderId,
        invoiceType: this.queryCondition.selectedInvoiceType
          ? this.queryCondition.selectedInvoiceType
          : "",
        invoiceCode: this.queryCondition.invoiceCode,
        invoiceNo: this.queryCondition.invoiceNo,
        invoiceTimeStart: !this.queryCondition.invoiceTimeGap
          ? ""
          : this.queryCondition.invoiceTimeGap.length > 1
            ? parseTime(this.queryCondition.invoiceTimeGap[0], "{y}-{m}-{d}")
            : "",
        invoiceTimeEnd: !this.queryCondition.invoiceTimeGap
          ? ""
          : this.queryCondition.invoiceTimeGap.length > 1
            ? parseTime(this.queryCondition.invoiceTimeGap[1], "{y}-{m}-{d}")
            : "",
        PageInfo: {
          PageSize: this.pageSize,
          CurrentPage: this.currentPage
        }
      };
      console.log("已上传票据查询条件:", queryData);
      return queryData;
    },
    _queryIvcData(queryData) {
      this.$reqPost("/dataApis/api/invoice", queryData)
        .then(res => {
          // console.log("蓝票查询结果:", res);
          //if (!res || !res.data || !res.data.data || res.data.code != 0) return;
          console.log("res:", res);
          this._btnDisabledStatus(false, false);
          this.queryResult = Array.isArray(res.data.data) ? res.data.data : [];
          // this.queryTotal = res.data.total;
          // console.log("queryTotal:", this.queryTotal);
          console.log("票据查询结果数据：", this.queryResult);
          if (res.data.total === 0) {
            console.log("到最后一页的下一页！");
            this.btnNextDisabled = true;
            return;
          }
          console.log("this.currentPage:", this.currentPage);
          if (this.currentPage == 1) {
            this.btnPreDisabled = true;
            return;
          } else if (this.currentPage > 1) {
            this.btnPreDisabled = false;
          }
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
    _btnDisabledStatus(preFlag, nextFlag) {
      this.btnPreDisabled = preFlag;
      this.btnNextDisabled = nextFlag;
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
