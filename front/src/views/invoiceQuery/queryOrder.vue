<template>
<div class="queryOrderWrap">
    <el-card :body-style="{padding:'12px 20px'}">
        <div slot="header" class="headerWrap clearfix">
          <span class="sectionTitle">第一步：用订单号查询，以电子发票开票的订单.</span>
          <!-- 查询还未上传任何电子发票的订单,【数据从订单数据来】 -->
             <!-- <span>查询条件：订单号，XX时间段</span> -->
             <el-form ref="queryform" :model="formData" :rules="formRules" size="mini" label-width="80px">
                 <el-row>
                     <el-col :span="8">
                         <el-form-item label="订单编号" prop="queryOrderId">
                            <el-input placeholder="请输入订单编号" v-model="formData.queryOrderId"></el-input>
                         </el-form-item>
                     </el-col>
                     <el-col :span="2">
                            <el-button class="queryBtn" type="primary" size="small" @click="_onQuery">查询</el-button>
                     </el-col>
                 </el-row>
             </el-form>
		    </div>
        
        <section><span class="sectionTitle">订单信息查询结果：</span></section>
        <el-table class="elTable" border :data="queryResult" style="width:100%" max-height="108px">
            <el-table-column fixed type="index"  label="序号" width="50">
            </el-table-column>
            <el-table-column fixed prop="orderId" label="订单编号" width="120"></el-table-column>
            <el-table-column  prop="consigneeFullName" label="收货人基本信息" width="240"></el-table-column>
            <el-table-column  prop="orderTime" label="下单时间" width="180"></el-table-column>
            <el-table-column  prop="sellerPrice" label="开票金额" width="100"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                    <el-button type="text" size="small" @click="toBlueInvoice(scope.row)">录入蓝票</el-button>
              </template>
            </el-table-column>
        </el-table>
        <section><span class="sectionTitle subTitle">包含的蓝票：</span></section>
        <m-ivc-table ref="mIvcTable" class="ivcTable" :queryIvcCondition="queryIvcCondition" :blueOnlyFlag="false"></m-ivc-table>
        <!-- <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total,sizes,prev,pager,next,jumper"
                :current-page = currentPage
                :page-sizes=pageSizes
                :page-size="1"
                :total=queryTotal>
            </el-pagination>
        </div> -->
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
import mx_operateRoute from "@/mixins/mx_operateRoute.js";
import config from "@/config/paramsConfig.js";
import { parseTime } from "@/utils";
import ivcTable from "@/views/invoiceQuery/ivcTable";

export default {
  mixins: [mx_operateRoute],
  components: {
    [ivcTable.name]: ivcTable
  },
  data() {
    return {
      // loadingStatus: false,
      formData: {
        queryOrderId: ""
      },
      formRules: {
        queryOrderId: [
          {
            required: true,
            message: "请输入一个订单号，开始你的查询！",
            trigger: "blur"
          }
        ]
      },
      queryResult: [],
      pageFromName: "",
      queryIvcCondition: {}
    };
  },
  // 疑问activated与beforeRouteEnter中的顺序，activated中为何this.pageFromName和this.queryOrderId 取值为空？
  // activated() {
  //   // console.log("this.queryTotal:", this.queryTotal);
  //   console.log("缓存的组件又出现了，我是不是要重新拉取数据呢？");
  //   console.log("this.queryOrderId:", this.queryOrderId);
  //   if (this.pageFromName == "invoiceBlueFrom") {
  //     // 再次按回传的orderId查询订单数据
  //     console.log("this.queryOrderId:", this.queryOrderId);
  //     _onQuery();
  //   }
  // },
  methods: {
    toBlueInvoice(row) {
      console.log("row: ", row);
      this.$router.push({ path: `invoiceBlueFrom/${row.orderId}` });
    },
    async _onQuery() {
      try {
        let validFlag = false;
        //调查询接口查询“以电子发票开票的订单”
        this.$refs["queryform"].validate(valid => {
          validFlag = valid;
        });
        if (!validFlag) return;
        //开始查询
        let res = await this.$reqGet(config.url.orderQueryUrl, {
          orderId: this.formData.queryOrderId
        }).catch(err => {
          throw new Error("订单查询列表获取错误：" + err.toString());
          // console.log("err:", err);
          // throw new Error(err);
        });
        if (!res) return;

        console.log("订单查询结果res！", res);
        let resultData = res.data.data;
        //构造蓝票查询条件并调用查询方法==start============================================
        this.createQueryConditionFromBlueIvc();
        //构造蓝票查询条件并调用查询方法==end============================================
        if (!resultData) {
          this.queryResult = null;
          return;
        }
        resultData.forEach(element => {
          // console.log("each order:", element);
          for (let item in element) {
            if (item == "orderTime") {
              element[item] = parseTime(element[item], "{y}-{m}-{d}");
            }
          }
        });
        this.queryResult = resultData;
      } catch (err) {
        this.$showMessage("订单查询错误：" + err.toString(), "error");
        console.log("订单查询错误：", err);
      }
    },
    createQueryConditionFromBlueIvc() {
      //构造蓝票查询条件并调用查询方法==start============================================
      this.queryIvcCondition = {
        orderId: this.formData.queryOrderId,
        invoiceType: config.ivcType.blue.key
      };
      console.log("this.queryIvcCondition:", this.queryIvcCondition);
      //构造蓝票查询条件并调用查询方法==end============================================
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
.ivcTable,
.elTable {
  margin-top: -10px;
  margin-bottom: 12px;
}
.el-card {
  .el-card__header {
    padding: 12px 20px;
  }
  .el-card__body {
    padding: 12px 20px;
  }
}
.queryOrderWrap {
  .sectionTitle {
    display: block;
    // padding-bottom: 2px;
    margin-bottom: 15px;
    // border-bottom: 1px dashed #ccc;
    font-weight: bold;
    &.subTitle {
      padding-left: 10px;
    }
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
