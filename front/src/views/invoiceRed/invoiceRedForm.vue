<template>
<div class="redWrap">
    <el-card>
        <div slot="header" class="headerWrap">
            <span class="sectionTitle">第二步：录入蓝票信息，并上传.</span>
            <el-button type="primary" size="medium" @click="onSubmit">立即上传红票信息</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
        </div>
        <div class="redFormWrap">
            <div class="title">发票信息</div>
            <el-form class="formWrap" size="small" ref="formWrap" label-width="120px" :model="formData" :rules="formRules">
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
                    <el-form-item label="PDF上传">
                      <input id="file" ref="file" type="file" name="file" @change="_uploadFile" accept="application/pdf">
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

export default {
  data() {
    return {
      formData: {
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
        blueInvoiceCode: "",
        blueInvoiceNo: "",
        invoiceTime: ""
      },
      formRules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        invoiceCode: [
          { required: true, message: "原蓝票代码不能为空", trigger: "blur" }
        ],
        invoiceNo: [
          { required: true, message: "原蓝票号码不能为空", trigger: "blur" }
        ],
        blueInvoiceCode: [
          { required: true, message: "红票代码不能为空", trigger: "blur" }
        ],
        blueInvoiceNo: [
          { required: true, message: "红票号码不能为空", trigger: "blur" }
        ],
        invoiceTime: [
          {
            type: "date",
            required: true,
            message: "开票日期不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.formData.orderId = this.$route.params.orderId;
    this.formData.blueInvoiceCode = this.$route.params.invoiceCode;
    this.formData.blueInvoiceNo = this.$route.params.invoiceNo;
    console.log(
      this.formData.orderId,
      this.formData.blueInvoiceCode,
      this.formData.blueInvoiceNo
    );
  },
  methods: {
    _checkFileExt(path) {
      if (!path.match(/.pdf$/i)) {
        return false;
      }
      return true;
    },
    _checkSize(fileSize) {
      let maxSize = 100 * 1024;
      return fileSize < maxSize;
    },
    _uploadFile(e) {
      let tempPath = e.target.value;
      let file = e.target.files[0];
      //文件合规判断/start
      let fileSize = this.$refs.file.files[0].size;
      let extMatch = this._checkFileExt(tempPath);
      let sizeMatch = this._checkSize(fileSize);

      if (!extMatch) {
        this.$message({
          showClose: true,
          message: "注意：只能上传.pdf文件，不能上传其它类型哦~",
          type: "error"
        });
        return;
      }
      if (!sizeMatch) {
        this.$message({
          showClose: true,
          message: "注意：pdf文件大小不能超过100K哦~",
          type: "error"
        });
        return;
      }
      //文件合规判断/end

      //发送pdf上传请求
      let url = "/fileUpload";
      //let formData = new FormData(this.$refs.formWrap.$el);
      let formData = new FormData();
      formData.append("mFile", file);
      // console.log("formData.get(file):", formData.get("file"));
      // console.log("this.$refs.file: ", this.$refs.file.files[0]);

      this.$reqPost("/fileApis/fileApi/fileUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          console.log("上传接口返回：", res.data.path);
          let pdf_xiangduiPath = res.data.path;
          if (!pdf_xiangduiPath) {
            this.$message({
              showClose: true,
              message: "pdf上传失败，请重新再试 ！"
            });
            return;
          }

          let tempArray = pdf_xiangduiPath.split("\\");
          let pdfName = tempArray[tempArray.length - 1];

          //D:\APIService\SourceInvoicePDF
          this.formData.pdfPath = encodeURIComponent(pdf_xiangduiPath); //pdfName;
          console.log("pdf_xiangduiPath:", pdf_xiangduiPath);
          console.log("this.formData.pdfPath:", this.formData.pdfPath);

          this.$message({
            showClose: true,
            message: res.data.path,
            type: "success"
          });
        })
        .catch(err => {
          console.log("blue page query Test err:", err);
        });
      //发送pdf上传请求/end
    },
    onSubmit() {
      let postData = {
        OrderId: this.formData.orderId,
        InvoiceCode: this.formData.invoiceCode,
        InvoiceNo: this.formData.invoiceNo,
        InvocieTime: this.formData.invoiceTime,
        BlueInvoiceCode: this.formData.blueInvoiceCode,
        BlueInvoiceNo: this.formData.blueInvoiceNo,
        PDFInfo: this.formData.pdfPath,
        ReceiverName: config.receiverName
      };
      console.log("红票上传数据：", postData);
      axios
        .post("/dataApis/api/invoice-red", postData)
        .then(res => {
          console.log("红票上传返回：", res);
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
          console.log("红票上传返回错误：", err);
        });
    },
    onCancel() {
      this.$refs.formWrap.resetFields();
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
