<template>
<div class="blueFormWrap">
    <section class="title">发票信息</section>
    <el-form class="formWrap" size="small" ref="formWrap" label-width="250px" status-icon :model="formData" :rules="formRules">
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="订单编号" prop="orderId">
                        <el-input :disabled="true" v-model="formData.orderId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="发票代码（来至预设可改）" prop="invoiceCode">
                        <el-input v-model="formData.invoiceCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                    <el-form-item label="发票号码" prop="invoiceNo">
                        <el-input v-model.number="formData.invoiceNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="发票抬头" prop="ivcTitle">
                        <el-input v-model="formData.ivcTitle"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                    <el-form-item label="开票金额" prop="totalPrice">
                        <el-input v-model.number="formData.totalPrice"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="销货方税号（来至预设可改）" prop="receiverTaxNo">
                        <el-input v-model="formData.receiverTaxNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                    <el-form-item label="销货方公司名称（来至预设可改）" prop="receiverName">
                        <el-input v-model="formData.receiverName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="开票日期" prop="invoiceTime">
                        <el-date-picker v-model="formData.invoiceTime" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1">
                    <el-form-item label="PDF上传" prop="pdfPath">
                        <input id="file" ref="file" type="file" name="file" @change="_uploadFileByCatch($event,config.ivcType.blue.name)" :v-model="formData.pdfPath"  accept="application/pdf">
                        <div class="fileNotice">（文件大小不能超过100KB）</div>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-button type="primary" size="medium" @click="onSave">获取数据</el-button> -->
        </el-form>
</div>
</template>

<script type="text/ecmascript-6">
import dateUtil from "@/utils/date";
import config from "@/config/paramsConfig";
import mx_uploadFile from "@/mixins/mx_formUploadfile.js";

// import axios from "axios";
export default {
  name: "m-blue-form",
  mixins: [mx_uploadFile],
  props: [
    "formOrderId",
    "formInvoiceCode",
    "formInvoiceNo",
    "formIvcTitle",
    "formTotalPrice",
    "formInvoiceTime",
    "formPdfPath",
    "formReceiverTaxNo",
    "formReceiverName"
  ],
  data() {
    return {
      ivcType: config.ivcType.blue.name
    };
  },
  created() {
    this.formData.orderId = this.formOrderId;
    // this.formData.receiverTaxNo = this.formReceiverTaxNo;
    // this.formData.receiverName = this.formReceiverName;
  },
  computed: {
    /*为了监控form中控件值的变化，实现双向绑定而建立----------------*/
    // c_orderId() {
    //   return this.formData.orderId;
    // },
    c_invoiceCode() {
      return this.formData.invoiceCode;
    },
    c_invoiceNo() {
      return this.formData.invoiceNo;
    },
    c_ivcTitle() {
      return this.formData.ivcTitle;
    },
    c_totalPrice() {
      return this.formData.totalPrice;
    },
    c_invoiceTime() {
      return this.formData.invoiceTime;
    },
    c_pdfPath() {
      return this.formData.pdfPath;
    },
    c_receiverTaxNo() {
      return this.formData.receiverTaxNo;
    },
    c_receiverName() {
      return this.formData.receiverName;
    }

    /*为了监控form中控件值的变化，实现双向绑定而建立------------------*/
  },
  watch: {
    /*为了监控form中控件值的变化，实现双向绑定而建立----------------*/
    // c_orderId(newValue) {
    //   this.$emit("update:formOrderId", newValue);
    // },
    c_invoiceCode(newValue) {
      console.log("发票号码点击：", newValue);
      this.$emit("update:formInvoiceCode", newValue);
    },
    c_invoiceNo(newValue) {
      this.$emit("update:formInvoiceNo", newValue);
    },
    c_ivcTitle(newValue) {
      this.$emit("update:formIvcTitle", newValue);
    },
    c_totalPrice(newValue) {
      this.$emit("update:formTotalPrice", newValue);
    },
    c_invoiceTime(newValue) {
      this.$emit("update:formInvoiceTime", newValue);
    },
    c_pdfPath(newValue) {
      this.$emit("update:formPdfPath", newValue);
    },
    c_receiverTaxNo(newValue) {
      this.$emit("update:formReceiverTaxNo", newValue);
    },
    c_receiverName(newValue) {
      this.$emit("update:formReceiverName", newValue);
    }
    /*为了监控form中控件值的变化，实现双向绑定而建立----------------*/
  },
  methods: {
    async _uploadFileByCatch(event, ivcTypeName) {
      try {
        await this._uploadFile(event, ivcTypeName);
      } catch (err) {
        this.$showMessage(
          `${ivcTypeName}pdf上传过程错误:${err.toString()}`,
          "error"
        );
        console.log(`${ivcTypeName}pdf上传过程错误:`, err);
      }
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.blueFormWrap {
  margin-top: 10px;
  border-bottom: 1px dashed #ccc;
  > .title {
    font-weight: bold;
  }
  .fileNotice {
    color: #afafaf;
  }
}
</style>
