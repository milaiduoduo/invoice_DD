<template>
<div class="queryOrderWrap">
    <el-card>
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
                            <el-button :loading="loadingStatus" class="queryBtn" type="primary" size="small" @click="_onQuery">查询</el-button>
                     </el-col>
                 </el-row>
             </el-form>
		    </div>
        
        <section><span class="sectionTitle">订单信息查询结果：</span></section>
        <el-table border :data="queryResult" style="width:100%" height="50%">
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
import config from "@/config/paramsConfig.js";
import { parseTime } from "@/utils";

export default {
  data() {
    return {
      loadingStatus: false,
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
      // pageSizes: [10, 30, 50, 100],
      // pageSize: 10,
      // currentPage: 1,
      // queryTotal: 130,
      pageFromName: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("from:", from);
    next(vm => {
      vm.pageFromName = from.name;
      if (vm.pageFromName == "invoiceBlueFrom") {
        vm.formData.queryOrderId = from.params.orderId;
        console.log("重新查询：", vm.pageFromName);
        // 再次按回传的orderId查询订单数据
        // console.log("this.queryOrderId:", this.queryOrderId);
        vm._onQuery();
      }
    });
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

      // this.$router.push({
      //   name: "invoiceBlueFrom",
      //   params: { orderId: row.orderId }
      // });
    },
    _onQuery() {
      try {
        this.loadingStatus = true;
        //调查询接口查询“以电子发票开票的订单”
        this.$refs["queryform"].validate(valid => {
          if (!valid) {
            this.loadingStatus = false;
            return;
          }
          console.log("开始查询");
          //开始查询
          this.$reqGet(config.url.orderQueryUrl, {
            // params: {
            orderId: this.formData.queryOrderId
            // }
          })
            .then(res => {
              console.log("开始返回！");
              let resultData = res.data.data;
              if (!resultData) {
                this.loadingStatus = false;
                return;
              }
              resultData.forEach(element => {
                console.log("each order:", element);
                for (let item in element) {
                  if (item == "orderTime") {
                    element[item] = parseTime(element[item], "{y}-{m}-{d}");
                  }
                }
              });
              this.queryResult = resultData;
              this.loadingStatus = false;

              // this.queryTotal = resultData.length;
            })
            .catch(err => {
              throw new Error("订单查询请求错误：", err);
            });
        });
      } catch (err) {
        this.loadingStatus = false;
        console.log("订单查询过程错误：", err);
      }
    }
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   console.log(`当前页: ${val}`);
    //   console.log("currentPage:", this.currentPage);
    // }
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
.queryOrderWrap {
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
