<template>
    <div class="blueDetailWrap">
        <el-card>
        <!-- <div slot="header" class="headerWrap clearfix"> -->
          <!-- <span class="sectionTitle">红票详情：</span> -->
        <!-- </div> -->
        <el-form class="formWrap" size="small" ref="formWrap" label-width="120px" :model="formData">
                <section class="category blueWrap">原蓝票信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="原蓝票代码" prop="blueInvoiceCode">
                            <el-input :disabled="true" v-model="formData.blueInvoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="原蓝票号码" prop="blueInvoiceNo">
                            <el-input :disabled="true" v-model.number="formData.blueInvoiceNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票抬头" prop="ivcTitle">
                            <el-input :disabled="true" v-model="formData.ivcTitle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票金额" prop="totalPrice">
                            <el-input :disabled="true" v-model.number="formData.totalPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <!-- <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票人" prop="drawer ">
                            <el-input :disabled="true" v-model="formData.drawer"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收款人" prop="payee">
                            <el-input :disabled="true" v-model="formData.payee"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                 <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票日期" prop="invoiceTime">
                            <el-date-picker :disabled="true" v-model="formData.invoiceTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="销货方税号" prop="receiverTaxNo">
                            <el-input :disabled="true" v-model="formData.receiverTaxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="销货方公司名称" prop="receiverName">
                            <el-input :disabled="true" v-model="formData.receiverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <section class="category">订单信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单编号" prop="orderId">
                            <el-input :disabled="true" v-model="formData.orderId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="用户应付金额" prop="orderId">
                            <el-input :disabled="true" v-model="formData.orderPayment"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <section class="category redWrap">红票信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="红票代码" prop="redInvoiceCode">
                            <el-input :disabled="true" v-model="formData.redInvoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="红票号码" prop="redInvoiceNo">
                            <el-input :disabled="true" v-model.number="formData.redInvoiceNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票日期" prop="redInvoiceTime">
                            <el-date-picker :disabled="true" v-model="formData.redInvoiceTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                
                <el-row>
                    <el-col :offset="1">
                        <el-form-item label="PDF查看" prop="redPdfPath">
                            <el-button type="text" @click="showPdf(formData.redPdfPath)">点击查看</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- consigneeInfo 收货人基本信息 -->
                <section class="category">收货人信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人姓名" prop="consigneeFullName">
                            <el-input :disabled="true" v-model="formData.consigneeFullName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人电话" prop="consigneePhone">
                            <el-input :disabled="true" v-model="formData.consigneePhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人地址" prop="consigneeFullAddress">
                            <el-input :disabled="true" v-model="formData.receiverTaxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单支付方式" prop="payType">
                            <el-input :disabled="true" v-model="formData.receiverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        orderId: "",
        blueInvoiceCode: "",
        blueInvoiceNo: "",
        redInvoiceCode: "",
        redInvoiceNo: "",
        redInvoiceTime: "",
        redPdfPath: "",
        ivcTitle: "",
        totalPrice: "",
        invoiceTime: "",
        pdfPath: "",
        receiverTaxNo: "",
        receiverName: "",
        drawer: "",
        payee: "",
        consigneeFullName: "",
        consigneeMobile: "",
        consigneeFullAddress: "",
        consigneeTelephone: "",
        payType: "",
        consigneePhone: ""
      }
    };
  },
  created() {
    try {
      console.log("红票详情参数获取：", this.$route.params);
      let {
        orderId,
        blueInvoiceCode,
        blueInvoiceNo,
        invoiceCode,
        invoiceNo
      } = this.$route.params;
      if (
        !orderId ||
        !blueInvoiceCode ||
        !blueInvoiceNo ||
        !invoiceCode ||
        !invoiceNo
      ) {
        this.$showMessage(
          "订单号、红蓝发票号、红蓝票发票代码读取错误，请重新从列表点击进入！",
          "error"
        );
        // this.$message({
        //   showClose: true,
        //   message:
        //     "订单号、红蓝发票号、红蓝票发票代码读取错误，请重新从列表点击进入！",
        //   type: "error"
        // });
        return;
      }
      //   axios
      //     .all([
      //       axios.get(
      //         `/dataApis/api/invoice?invoiceCode=${invoiceCode}&invoiceNo=${invoiceNo}&orderId=${orderId}`
      //       ),
      //       axios.get(
      //         `/dataApis/api/invoice?invoiceCode=${blueInvoiceCode}&invoiceNo=${blueInvoiceNo}&orderId=${orderId}`
      //       )
      //     ])

      axios
        .all([
          this.$reqGet(
            `/1dataApis/api/invoice?invoiceCode=${invoiceCode}&invoiceNo=${invoiceNo}&orderId=${orderId}`
          ),
          this.$reqGet(
            `/dataApis/api/invoice?invoiceCode=${blueInvoiceCode}&invoiceNo=${blueInvoiceNo}&orderId=${orderId}`
          )
        ])
        .then(res => {
          console.log("红票详情:", res);
          let redIvcObj, blueIvcObj, orderObj;

          if (res[0].data.data.invoiceInfo.blueInvoiceCode) {
            redIvcObj = res[0].data.data.invoiceInfo;
            blueIvcObj = res[1].data.data.invoiceInfo;

            orderObj = res[1].data.data.orderInfo;
            // console.log(
            //   "1.redIvcObj,blueIvcObj,orderObj",
            //   redIvcObj,
            //   blueIvcObj,
            //   orderObj
            // );
          } else {
            redIvcObj = res[1].data.data.invoiceInfo;
            blueIvcObj = res[0].data.data.invoiceInfo;
            orderObj = res[0].data.data.orderInfo;
            // console.log(
            //   "2.redIvcObj,blueIvcObj,orderObj",
            //   redIvcObj,
            //   blueIvcObj,
            //   orderObj
            // );
          }

          //   let blueIvcObj = res.data.data.invoiceInfo;
          //   let orderObj = res.data.data.orderInfo;
          console.log("redIvcObj:", redIvcObj);
          console.log("blueIvcObj:", blueIvcObj);
          console.log("orderObj:", orderObj);

          this.formData.blueInvoiceCode = blueIvcObj.invoiceCode;
          this.formData.blueInvoiceNo = blueIvcObj.invoiceNo;
          this.formData.orderId = blueIvcObj.orderId;
          this.formData.redInvoiceCode = redIvcObj.invoiceCode;
          this.formData.redInvoiceNo = redIvcObj.invoiceNo;
          this.formData.redPdfPath = redIvcObj.pdfInfo;
          console.log("redIvcObj.pdfInfo:::::", redIvcObj.pdfInfo);
          this.formData.redInvoiceTime = redIvcObj.invoiceTime;
          this.formData.ivcTitle = blueIvcObj.invoiceTitle;
          this.formData.totalPrice = blueIvcObj.totalPrice;
          this.formData.invoiceTime = blueIvcObj.invoiceTime;

          this.formData.receiverTaxNo = blueIvcObj.receiverTaxNo;
          this.formData.receiverName = blueIvcObj.receiverName;
          this.formData.drawer = blueIvcObj.drawer;
          this.formData.payee = blueIvcObj.payee;
          this.formData.consigneeFullName = orderObj.consigneeFullName;
          this.formData.consigneeFullAddress = orderObj.consigneeFullAddress;
          this.formData.consigneePhone =
            orderObj.consigneeMobile + " 或 " + orderObj.consigneeTelephone;
          this.formData.payType = orderObj.payType;
          this.formData.orderPayment = orderObj.payment;
        })
        .catch(err => {
          this.$showMessage(
            "红票详情页数据获取错误：" + err.toString(),
            "error"
          );
          console.log("红票详情页数据获取错误:", err);
          //   throw err;
        });
    } catch (err) {
      this.$showMessage("红票详情页错误：" + err.toString(), "error");
      console.log("红票详情错误:", err);
    }
  },
  methods: {
    showPdf(href) {
      window.open(href);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.blueDetailWrap {
  padding-bottom: 20px;
}
.sectionTitle {
  display: block;
  padding-bottom: 11px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  font-weight: bold;
}
.category {
  font-weight: bold;
  padding: 0 0 10px 20px;
}
</style>
