<template>
<div class="blueWrap">
    <el-card class="elcardWrap">
      <span class="sectionTitle">第二步：录入蓝票信息，并上传.</span>
        <!-- <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSubmit">立即上传蓝票信息</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onAddInvoice">继续录入蓝票</el-button>
        </div> -->
        <div v-for="(item,index) in formList" :key="index">
          <div>orderId: {{item.orderId}}</div>
          <div>invoiceCode: {{item.invoiceCode}}</div>
          <div>invoiceNo: {{item.invoiceNo}}</div>
          <div>ivcTitle: {{item.ivcTitle}}</div>
          <div>totalPrice: {{item.totalPrice}}</div>
          <div>invoiceTime: {{item.invoiceTime}}</div>
          <div>pdfPath: {{item.pdfPath}}</div>
          <!-- 为了监控form中控件值的变化，实现双向绑定而建立 -->
          <m-blue-form 
            :form-order-id.sync="item.orderId"
            :form-invoice-code.sync="item.invoiceCode"
            :form-invoice-no.sync="item.invoiceNo"
            :form-ivc-title.sync="item.ivcTitle"
            :form-total-price.sync="item.totalPrice"
            :form-invoice-time.sync="item.invoiceTime"
            :form-pdf-path.sync="item.pdfPath"
            ></m-blue-form>
          </div> 
        <div class="footer">
            <el-button type="primary" @click="onAllSubmit">蓝票录入完毕，上传！</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
            <el-button type="success" size="small" @click="onAddInvoice"> + 继续录入蓝票</el-button>   
            <el-button type="success" @click="onTest">测试数据接口</el-button>
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import blueForm from "./blueForm.vue";
import axios from "axios";
import config from "@/config/paramsConfig";
let initFormData = {
  orderId: "",
  invoiceCode: "",
  invoiceNo: "",
  ivcTitle: "",
  totalPrice: "",
  invoiceTime: "",
  pdfPath: ""
};
export default {
  data() {
    return {
      orderId: "",
      formList: []
    };
  },
  methods: {
    onTest() {
      axios
        .post("/dataApis/api/invoice", {
          PageInfo: {
            PageSize: 100,
            CurrentPage: 1
          }
        })
        .then(res => {
          console.log("调用京东接口测试。。。。");
          console.log("京东接口已传发票数据：", res);
        })
        .catch(err => {
          console.log("京东接口调用error:", err);
        });
    },
    onAllSubmit() {
      /*获取所有From字段的值，并发送请求*/
      console.log("this.formList all submit:", this.formList);
      for (let i = 0; i < this.formList.length; i++) {
        let formData = this.formList[i];

        let OrderId = formData.orderId;
        let ReceiverTaxNo = formData.ReceiverTaxNo;
        let InvoiceCode = formData.invoiceCode;
        let InvoiceNo = formData.invoiceNo;
        let IvcTitle = formData.ivcTitle;
        let TotalPrice = formData.totalPrice;
        let InvocieTime = formData.invoiceTime;
        let PDFInfo = FormData.pdfPath;

        console.log(
          OrderId,
          " | ",
          ReceiverTaxNo,
          " | ",
          InvoiceCode,
          " | ",
          InvoiceNo,
          " | ",
          IvcTitle,
          " | ",
          TotalPrice,
          " | ",
          InvocieTime,
          " | ",
          PDFInfo
        );

        axios
          .post("/dataApis/api/invoice-blue", {
            OrderId: this.$route.params.orderId,
            ReceiverTaxNo: config.receiverTaxNo,
            InvoiceCode: "065001800111",
            InvoiceNo: 1239208,
            IvcTitle: "个人",
            TotalPrice: 100,
            InvocieTime: "2018-10-26",
            PDFInfo: "111.pdf"
          })
          .then(res => {
            console.log("蓝票上传返回：", res);
            if (res.data.code == 0 && res.data.isSuccess) {
              if (res.data.message == "重复开票") {
                this.$message({
                  showClose: true,
                  message: res.data.message + ",注意发票号不能重复！",
                  type: "error"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "上传成功！",
                  type: "success"
                });
              }
            }
          })
          .catch(err => {
            console.log("蓝票上传返回错误：", err);
          });
      }
    },
    onCancel() {
      this.formList.pop();
      this.$reqPost("/fileApis/fileApi/post_test").then(res => {
        console.log("Test上传接口返回：", res);
      });
    },
    onAddInvoice() {
      this.formList.push(Object.create(initFormData));
      for (let i = 0; i < this.formList.length; i++) {
        let orderId = this.formList[i].orderId;
        console.log("add ,序号：", i, " orderId:", orderId);
      }
    }
  },
  components: {
    [blueForm.name]: blueForm
  },
  created() {
    this.orderId = this.$route.params.orderId;
    // console.log("this.$route.params.orderId:", this.$route.params.orderId);
    // this.initFormData.orderId = this.$route.params.orderId;
    // this.initFormData.receiverTaxNo = this.config.receiverTaxNo;
    // this.initFormData.receiverName = this.config.receiverName;
    this.formList.push(Object.create(initFormData));
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.blueWrap {
  .sectionTitle {
    display: block;
    padding-bottom: 11px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    font-weight: bold;
  }
  .footer {
    margin-top: 10px;
  }
  .elcardWrap {
    > .title {
      font-weight: bold;
    }
  }
}
</style>
