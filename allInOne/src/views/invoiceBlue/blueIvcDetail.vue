<template>
    <div class="blueDetailWrap">
        <el-card>
        <!-- <div slot="header" class="headerWrap clearfix"> -->
          <!-- <span class="sectionTitle">蓝票详情：</span> -->
        <!-- </div> -->
        <el-form class="formWrap" size="small" ref="formWrap" label-width="120px" :model="formData">
                <section class="category">订单信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单编号" prop="orderId">
                            <el-input :disabled="true" v-model="formData.orderId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="用户应付金额" prop="orderPayment">
                            <el-input :disabled="true" v-model="formData.orderPayment"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <section class="category blueWrap">蓝票信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票代码" prop="invoiceCode">
                            <el-input :disabled="true" v-model="formData.invoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票号码" prop="invoiceNo">
                            <el-input :disabled="true" v-model.number="formData.invoiceNo"></el-input>
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
                        <el-form-item label="开票人" prop="drawer">
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
                <el-row>
                    <el-col :offset="1">
                        <el-form-item label="PDF查看" prop="pdfPath">
                            <el-button type="text" @click="showPdf(formData.pdfPath)">点击查看</el-button>
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
                            <el-input :disabled="true" v-model="formData.consigneeFullAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单支付方式" prop="payType">
                            <el-input :disabled="true" v-model="formData.payType"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
export default {
  data() {
    return {
      formData: {
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
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
      let { orderId, invoiceCode, invoiceNo } = this.$route.params;
      console.log("蓝票详情获取的参数：", this.$route.params);
      if (!orderId || !invoiceCode || !invoiceNo) {
        this.$showMessage(
          "订单号、发票号、发票代码，读取错误，请重新从列表点击进入！",
          "error"
        );
        return;
      }
      this._getDetailData(orderId, invoiceCode, invoiceNo);
    } catch (err) {
      this.$showMessage("蓝票详情页错误：" + err.toString(), "error");
      console.log("蓝票详情页错误：", err);
    }
  },
  methods: {
    showPdf(href) {
      window.open(href);
    },
    async _getDetailData(orderId, invoiceCode, invoiceNo) {
      try {
        let res = await this.$reqGet(
          `/dataApis/api/invoice?invoiceCode=${invoiceCode}&invoiceNo=${invoiceNo}&orderId=${orderId}`
        ).catch(err => {
          throw new Error("蓝票详情数据获取错误：" + err.toString());
          //this.$showMessage("蓝票详情数据获取错误：" + err.toString(), "error");
        });
        // 此处也可以不写catch，async函数内部的try-catch能够捕获到异常。
        console.log("蓝票详情：", res);
        if (!res) return;
        let invoiceInfo = res.data.data.invoiceInfo;
        let orderInfo = res.data.data.orderInfo;

        console.log("ivc：", invoiceInfo);
        console.log("orderInfo", orderInfo);
        this.formData.orderId = invoiceInfo.orderId;
        this.formData.invoiceCode = invoiceInfo.invoiceCode;
        this.formData.invoiceNo = invoiceInfo.invoiceNo;
        this.formData.ivcTitle = invoiceInfo.invoiceTitle;
        this.formData.totalPrice = invoiceInfo.totalPrice;
        this.formData.invoiceTime = invoiceInfo.invoiceTime;
        this.formData.pdfPath = invoiceInfo.pdfInfo;
        this.formData.receiverTaxNo = invoiceInfo.receiverTaxNo;
        this.formData.receiverName = invoiceInfo.receiverName;
        this.formData.drawer = invoiceInfo.drawer;
        this.formData.payee = invoiceInfo.payee;
        this.formData.consigneeFullName = orderInfo.consigneeFullName;
        this.formData.consigneeFullAddress = orderInfo.consigneeFullAddress;
        this.formData.consigneePhone =
          orderInfo.consigneeMobile + " 或 " + orderInfo.consigneeTelephone;
        this.formData.payType = orderInfo.payType;
        this.formData.orderPayment = orderInfo.payment;
      } catch (err) {
        this.$showMessage(err.toString(), "error");
        console.log("蓝票获取数据错误：", err);
        //throw err; 异步异常抛出去后无法被捕获！
      }
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
