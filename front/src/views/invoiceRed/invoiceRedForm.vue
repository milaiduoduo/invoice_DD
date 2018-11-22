<template>
<div class="redWrap">
    <el-card>
        <div slot="header" class="headerWrap">
            <span class="sectionTitle">第二步：录入蓝票信息，并上传.</span>
            <el-button type="primary" size="medium" @click="_onSubmit">立即上传红票信息</el-button>
            <el-button type="default" size="small" @click="_onCancel">取消</el-button>
        </div>
        <div class="redFormWrap">
            <div class="title">发票信息</div>
            <el-form class="formWrap" size="small" ref="formWrap" status-icon label-width="120px" :model="formData" :rules="formRules">
                <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="订单编号" prop="orderId">
                        <el-input :disabled="true" v-model="formData.orderId"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
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
                        <el-form-item label="红票代码" prop="invoiceCode">
                            <el-input v-model="formData.invoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="红票号码" prop="invoiceNo">
                            <el-input v-model.number="formData.invoiceNo"></el-input>
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
                      <input id="file" ref="file" type="file" name="file" @change="_uploadFileByCatch($event,config.ivcType.red.name)" :v-model="formData.pdfPath" accept="application/pdf">
                        <div class="fileNotice">（文件大小不能超过100KB）</div>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import config from "@/config/paramsConfig";
import mx_uploadFile from "@/mixins/mx_formUploadfile.js";
import mx_postData from "@/mixins/mx_postData.js";
import { parseTime } from "@/utils";

export default {
  mixins: [mx_uploadFile, mx_postData],
  created() {
    // console.log("this:", this);
    this.formData.orderId = this.$route.params.orderId;
    this.formData.blueInvoiceCode = this.$route.params.invoiceCode;
    this.formData.blueInvoiceNo = this.$route.params.invoiceNo;
    // console.log(
    //   this.formData.orderId,
    //   this.formData.blueInvoiceCode,
    //   this.formData.blueInvoiceNo
    // );
  },
  methods: {
    _onSubmit() {
      try {
        // console.log('this.$refs["formWrap"]:', this.$refs["formWrap"]);
        // return;
        this.$refs["formWrap"].validate(valid => {
          if (!valid) return;
          this._submitData();
        });
      } catch (err) {
        console.log("红票上传所有数据过程中错误：", err);
      }
    },
    _uploadFileByCatch(event, ivcTypeName) {
      try {
        this._uploadFile(event, ivcTypeName);
      } catch (err) {
        console.log(`${ivcTypeName}pdf上传过程错误:`, err);
      }
    },
    _submitData() {
      let parseIvcTime = parseTime(formData.invoiceTime, "{y}-{m}-{d}");
      let postData = {
        OrderId: this.formData.orderId,
        InvoiceCode: this.formData.invoiceCode,
        InvoiceNo: this.formData.invoiceNo,
        InvocieTime: parseIvcTime,
        BlueInvoiceCode: this.formData.blueInvoiceCode,
        BlueInvoiceNo: this.formData.blueInvoiceNo,
        PDFInfo: this.formData.pdfPath,
        ReceiverName: config.receiverName
      };
      console.log("红票上传数据：", postData);
      this._postData(postData, config.url.redIvcUploadUrl);
    },
    _onCancel() {
      this.$refs.formWrap.resetFields();
      this.$refs.file.value = "";
      this.formData.pdfPath = "";
      // this.$refs[formName].resetFields();
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
.footer {
  margin-top: 10px;
}
.elcardWrap {
  > .title {
    font-weight: bold;
  }
}
</style>
