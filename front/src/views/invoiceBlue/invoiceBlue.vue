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
          <!-- <div>orderId: {{item.orderId}}</div>
          <div>invoiceCode: {{item.invoiceCode}}</div>
          <div>invoiceNo: {{item.invoiceNo}}</div>
          <div>ivcTitle: {{item.ivcTitle}}</div>
          <div>totalPrice: {{item.totalPrice}}</div>
          <div>invoiceTime: {{item.invoiceTime}}</div>
          <div>pdfPath: {{item.pdfPath}}</div> -->
          <!-- 为了监控form中控件值的变化，实现双向绑定而建立 -->
          <m-blue-form ref="blueFormWrap"
            :form-order-id="item.orderId"
            :form-invoice-code.sync="item.invoiceCode"
            :form-invoice-no.sync="item.invoiceNo"
            :form-ivc-title.sync="item.ivcTitle"
            :form-total-price.sync="item.totalPrice"
            :form-invoice-time.sync="item.invoiceTime"
            :form-pdf-path.sync="item.pdfPath"
            :form-receiver-tax-no.sync = "item.receiverTaxNo"
            :form-receiver-name.sync="item.receiverName"
            ></m-blue-form>
          </div> 
        <div class="footer">
            <el-button type="primary" @click="onAllSubmit">蓝票录入完毕，上传！</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
            <el-button type="success" size="small" @click="onAddInvoice"> + 继续录入蓝票</el-button> 
            <!-- <el-button type="success" @click="onfileTest">测试文件服务接口</el-button>  
            <el-button type="success" @click="onTest">测试数据接口</el-button> -->
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import blueForm from "./blueForm.vue";
// import axios from "axios";
import config from "@/config/paramsConfig";
import mx_postData from "@/mixins/mx_postData.js";
import { parseTime } from "@/utils";

let initFormData = {
  orderId: "",
  invoiceCode: "",
  invoiceNo: "",
  ivcTitle: "",
  totalPrice: "",
  invoiceTime: "",
  pdfPath: "",
  receiverTaxNo: config.receiverTaxNo,
  receiverName: config.receiverName
};

export default {
  mixins: [mx_postData],
  data() {
    return {
      orderId: "",
      formList: []
    };
  },
  created() {
    //初始化第一个Form对应的数据
    // console.log("this:", this);
    this.orderId = this.$route.params.orderId;
    initFormData.orderId = this.orderId;
    this.formList.push(Object.create(initFormData));
  },
  methods: {
    _submitData(postData) {
      // console.log("蓝票上传数据：", postData);
      // return;
      this._postData(postData, config.url.blueIvcUploadUrl);
    },
    onAllSubmit() {
      try {
        //提交前验证，保证每个数据项都符合验证规则的
        let passFlag = true;
        this.$refs["blueFormWrap"].forEach(item => {
          console.log('item.$refs["formWrap"]', item.$refs["formWrap"]);
          item.$refs["formWrap"].validate(valid => {
            console.log("valid:", valid);
            if (!valid) passFlag = valid;
          });
        });
        if (!passFlag) return;
        console.log("数据验证通过，可以发出请求了！");

        // return;
        /*获取所有From字段的值，并发送请求*/
        console.log("this.formList all submit:", this.formList);
        for (let i = 0; i < this.formList.length; i++) {
          let formData = this.formList[i];
          console.log(formData.invoiceTime, " | ", typeof formData.invoiceTime);
          let parseIvcTime = parseTime(formData.invoiceTime, "{y}-{m}-{d}");

          let postData = {
            OrderId: formData.orderId,
            InvoiceCode: formData.invoiceCode,
            InvoiceNo: formData.invoiceNo,
            InvocieTime: parseIvcTime,
            IvcTitle: formData.ivcTitle,
            TotalPrice: formData.totalPrice,
            PDFInfo: formData.pdfPath,
            ReceiverName: formData.receiverName,
            ReceiverTaxNo: formData.receiverTaxNo
          };
          console.log("蓝票上传数据postData:", postData);
          // return;
          this._submitData(postData);
        }
      } catch (err) {
        console.log("蓝票上传所有数据过程中错误：", err);
      }
    },
    onCancel() {
      if (this.formList.length > 1) {
        this.formList.pop();
      }
      if (this.formList.length == 1) {
        console.log(this.$refs.blueForm.$el);
        this.$message({
          showClose: true,
          message: "需要实现清空内容！！！！",
          type: "error"
        });
      }
    },
    onAddInvoice() {
      this.formList.push(Object.create(initFormData));
      for (let i = 0; i < this.formList.length; i++) {
        let orderId = this.formList[i].orderId;
        console.log("add ,序号：", i, " orderId:", orderId);
      }
    }
    // onTest() {
    //   // axios
    //   //   .post("/dataApis/api/invoice", {
    //   //     PageInfo: {
    //   //       PageSize: 100,
    //   //       CurrentPage: 1
    //   //     }
    //   //   })
    //   this.$reqPost("/dataApis/api/invoice", {
    //     PageInfo: {
    //       PageSize: 100,
    //       CurrentPage: 1
    //     }
    //   })
    //     .then(res => {
    //       console.log("调用京东接口测试。。。。");
    //       console.log("京东接口已传发票数据：", res);
    //     })
    //     .catch(err => {
    //       console.log("京东接口调用error:", err);
    //     });
    // },
    // onfileTest() {
    //   this.$reqPost("/fileApis/fileApi/post_test").then(res => {
    //     console.log("Test上传接口返回：", res);
    //   });
    // }
  },

  components: {
    [blueForm.name]: blueForm
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
