<template>
    <div>
        <div class="pagination top" v-if="false">
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
        <el-table border stripe :data="queryResult" style="width:100%" >
            <el-table-column fixed prop="seq" label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="120"></el-table-column>
            <el-table-column fixed prop="invoiceTime" label="开票时间" width="100">
              <template slot-scope="scope">
                {{scope.row.invoiceTime?scope.row.invoiceTime.split("T")[0]:""}}
              </template>
            </el-table-column>
            <el-table-column fixed prop="invoiceTitle" label="抬头" width="240"></el-table-column>
            <el-table-column fixed prop="invoiceType" label="发票类型" width="80">
              <template slot-scope="scope">
                <!-- 注意事项，在这个位置无法使用直接引用进来的变量，需要把变量赋值到vue的实例变量中才能使用 -->
                {{scope.row.invoiceType==ivcType.blue.key?ivcType.blue.name:ivcType.red.name}}
              </template>
            </el-table-column>
            <el-table-column fixed prop="invoiceNo" label="发票号码" width="100"></el-table-column>
            <el-table-column fixed prop="invoiceCode" label="发票代码" width="120"></el-table-column>
            
            <el-table-column fixed prop="totalPrice" label="开票金额" width="100"></el-table-column>
            <!-- <el-table-column fixed prop="drawer" label="开票人" width="80"></el-table-column> -->
            <el-table-column fixed label="操作" width="180">
               <template slot-scope="scope">
                   <template v-if="blueOnlyFlag">
                        <el-button type="text" size="small" @click="_toRedInvoiceForm({orderId:scope.row.orderId,invoiceCode:scope.row.invoiceCode,invoiceNo:scope.row.invoiceNo})">冲红录入</el-button>
                        <el-button type="text" size="small" @click="_showDetail(scope.row)">查看蓝票</el-button>
                   </template>
                   <template v-else>
                        <el-button type="text" size="small" @click="_showDetail(scope.row)">查看详情</el-button> 
                   </template>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
// import queryIvcForm from "@/components/queryForm/queryIvcForm.vue";
import config from "@/config/paramsConfig";

export default {
  name: "m-ivc-table",
  props: ["queryIvcCondition", "blueOnlyFlag"],
  data() {
    return {
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

    this.onGetQueryCondition();
  },
  methods: {
    async onGetQueryCondition() {
      try {
        //初始化this.currentPage == 1
        this.currentPage == 1;
        this.queryCondition = this.queryIvcCondition;
        console.log("查询条件：", this.queryIvcCondition);

        let queryData = this._makePostData();
        await this._queryIvcData(queryData);
      } catch (err) {
        console.log("发票table异常：", err);
        this.$showMessage(err.toString(), "error");
      }
    },
    async onQueryByPageNum(direction) {
      try {
        if (direction == "pre") {
          console.log("1.in pre this.currentPage:", this.currentPage);

          this.currentPage = Math.max(1, --this.currentPage);
          console.log("2.in pre this.currentPage:", this.currentPage);
        } else {
          this.currentPage++;
        }
        console.log("this.currentPage:", this.currentPage);
        let queryData = this._makePostData();
        await this._queryIvcData(queryData);
      } catch (err) {
        this.$showMessage("翻页查询出错：" + err.toString(), "error");
      }
    },
    _makePostData() {
      let queryData = {
        orderId: this.queryCondition.orderId,
        invoiceType: this.queryCondition.invoiceType
          ? this.queryCondition.invoiceType
          : "",
        invoiceCode: this.queryCondition.invoiceCode,
        invoiceNo: this.queryCondition.invoiceNo,
        invoiceTimeStart: !this.queryCondition.invoiceTimeGap
          ? ""
          : this.queryCondition.invoiceTimeGap[0],
        invoiceTimeEnd: !this.queryCondition.invoiceTimeGap
          ? ""
          : this.queryCondition.invoiceTimeGap[1],
        PageInfo: {
          PageSize: this.pageSize,
          CurrentPage: this.currentPage
        }
      };
      console.log("queryData.PageInfo:", queryData.PageInfo);
      // 父组件收到查询条件数据：
      // console.log("父组件收到查询条件：", this.queryCondition);
      // console.log("post数据参数条件:", queryData);

      let queryConditionForSave = Object.assign({}, this.queryCondition, {
        PageInfo: {
          ...queryData.PageInfo
        }
      });

      // console.log("构造的需要保存的查询条件1：", queryConditionForSave);
      console.log(
        "构造的需要保存的查询条件2：",
        JSON.stringify(queryConditionForSave)
      );
      //保存查询条件
      this.$utils.setLocalStorage({
        queryCondition: JSON.stringify(queryConditionForSave)
      });

      return queryData;
    },
    async _queryIvcData(queryData) {
      try {
        let res = await this.$reqPost("/dataApis/api/invoice", queryData);
        // console.log("发票查询参数：", queryData);

        console.log("发票查询结果:", res);
        this._btnDisabledStatus(false, false);
        this.queryResult = Array.isArray(res.data.data) ? res.data.data : [];
        // console.log("queryTotal:", res.data.total);

        if (!res.data.data) {
          // console.log("到最后一页的下一页！");
          this.btnNextDisabled = true;
          return;
        }
        if (this.currentPage == 1) {
          this.btnPreDisabled = true;
          return;
        } else if (this.currentPage > 1) {
          this.btnPreDisabled = false;
        }
      } catch (err) {
        throw new Error("发票查询出错：", err);
      }
    },
    _toRedInvoiceForm(requiredItem) {
      console.log("红票传参：", requiredItem);
      this.$router.push({
        path: `invoiceRedForm/${requiredItem.orderId}/${
          requiredItem.invoiceCode
        }/${requiredItem.invoiceNo}`
      });
      //name的方式在某些情况下url上的地址不会更新
      // this.$router.push({
      //   name: "invoiceRedForm",
      //   params: {
      //     ...requiredItem
      //   }
      // });
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
    _ivcOptionChange() {
      this.currentPage = 1;
    }
  }
};
</script>


<style scoped lang="scss" rel="stylesheet/scss">
</style>
