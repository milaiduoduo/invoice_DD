<template>
<div class="queryOrderWrap">
    <el-card>
        <div slot="header" class="headerWrap clearfix">
          <span class="sectionTitle">第一步：用订单号查询，以电子发票开票的订单.</span>
          <!-- 查询还未上传任何电子发票的订单,【数据从订单数据来】 -->
             <!-- <span>查询条件：订单号，XX时间段</span> -->
             <el-form ref="queryform" size="mini" label-width="80px">
                 <el-row>
                     <el-col :span="8">
                         <el-form-item label="订单编号">
                            <el-input placeholder="请输入订单编号" v-model="queryOrderId"></el-input>
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
        <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total,sizes,prev,pager,next,jumper"
                :current-page = currentPage
                :page-sizes=pageSizes
                :page-size="1"
                :total=queryTotal>
            </el-pagination>
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      queryOrderId: "",
      queryResult: [],
      pageSizes: [10, 30, 50, 100],
      pageSize: 10,
      currentPage: 1,
      queryTotal: 130
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log("退后！beforeRouteLeave");
  //   to.meta.isBack = true;
  //   next();
  // },
  // activated() {
  //   console.log("退后！this.$route.meta.isBack:", this.$route.meta.isBack);
  //   if (!this.$route.meta.isBack) {
  //   }
  // },
  methods: {
    toBlueInvoice(row) {
      console.log("row: ", row);
      this.$router.push({
        name: "invoiceBlueFrom",
        params: { orderId: row.orderId }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      console.log("currentPage:", this.currentPage);
    },
    onQuery() {
      //调查询接口查询“以电子发票开票的订单”
      if (!this.queryOrderId) return;
      axios
        .get("/dataApis/api/order", {
          params: {
            orderId: this.queryOrderId
          }
        })
        .then(res => {
          let resultData = res.data.data;
          if (!resultData) return;
          resultData.forEach(element => {
            console.log("each order:", element);
            for (let item in element) {
              // console.log("item:", item);
              // console.log("elemtn.item", element[item]);
              if (item == "orderTime") {
                element[item] = element[item].replace("T", " ");
              }
            }
          });
          this.queryResult = resultData;

          //设置翻页组件参数
          this.queryTotal = resultData.length;
        })
        .catch(err => {
          console.log("订单查询错误：", err);
        });
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
