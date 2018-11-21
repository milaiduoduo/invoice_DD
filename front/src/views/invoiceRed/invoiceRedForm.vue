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
                      <input id="file" ref="file" type="file" name="file" @change="_uploadFile" :v-model="formData.pdfPath" accept="application/pdf">
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
    // 自定义验证
    // var validateInputFile = (rule, value, callback) => {
    //   console.log("value:", value);
    //   if (value == "") {
    //     console.log("inputFile验证不通过！");
    //     callback(new Error("pdf文件不能为空"));
    //   } else {
    //     console.log("inputFile验证成功！");
    //     callback();
    //   }
    // };
    return {
      formData: {
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
        blueInvoiceCode: "",
        blueInvoiceNo: "",
        invoiceTime: "",
        pdfPath: ""
      },
      formRules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        invoiceCode: [
          { required: true, message: "红票代码不能为空", trigger: "blur" }
        ],
        invoiceNo: [
          { required: true, message: "红票号码不能为空", trigger: "blur" }
        ],
        blueInvoiceCode: [
          { required: true, message: "原蓝票代码不能为空", trigger: "blur" }
        ],
        blueInvoiceNo: [
          { required: true, message: "原蓝票号码不能为空", trigger: "blur" }
        ],
        invoiceTime: [
          {
            type: "date",
            required: true,
            message: "开票日期不能为空",
            trigger: "change"
          }
        ],
        pdfPath: [
          { required: true, message: "pdf文件不能为空", trigger: "change" }
          // { validator: validateInputFile, trigger: "change" }
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
    _onSubmit() {
      try {
        this.$refs["formWrap"].validate(valid => {
          if (!valid) return;
          this._submitData();
        });
      } catch (err) {
        console.log("红票上传所有数据过程错误：", err);
      }
    },
    _uploadFile(e) {
      try {
        let tempPath = e.target.value;
        let file = e.target.files[0];
        console.log("file:", file);
        this.formData.pdfPath = tempPath;

        //必录项检查
        //只是为了错误提示的显示，并不返回任何东西
        this.$refs["formWrap"].validateField("pdfPath");
        if (!tempPath) return;

        //文件合规检查
        let checkResult = this._fileCheck(file);
        if (!checkResult) {
          //清空不合规的文件的显示值
          // console.log("input value:", this.$refs.file.value);
          this.$refs.file.value = "";
          return;
        }

        //发送pdf上传请求
        //let formData = new FormData(this.$refs.formWrap.$el);
        // console.log("formData.get(file):", formData.get("file"));
        // console.log("this.$refs.file: ", this.$refs.file.files[0]);

        let formData = new FormData();
        formData.append("mFile", file);

        this.$reqPost("/fileApis/fileApi/fileUpload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
          .then(res => {
            console.log("上传接口返回：", res.data.path);
            let pdf_relativePath = res.data.path;
            if (!pdf_relativePath) {
              this.$message({
                showClose: true,
                message: "pdf上传失败，请重新再传 ！",
                type: "error",
                duration: 0
              });
              return;
            }

            // 把上传路径设置成后台api要求的样子
            //D:\APIService\SourceInvoicePDF
            let tempArray = pdf_relativePath.split("\\");
            tempArray = pdf_relativePath.split(config.filePathDirect);
            pdf_relativePath = tempArray[tempArray.length - 1];
            this.formData.pdfPath = encodeURIComponent(pdf_relativePath);
            // console.log("pdf_relativePath:", pdf_relativePath);
            // console.log("this.formData.pdfPath:", this.formData.pdfPath);

            // this.$message({
            //   showClose: true,
            //   message: res.data.path,
            //   type: "success"
            // });
          })
          .catch(err => {
            throw new Error("红票pdf上传错误:", err);
            console.log("红票pdf上传错误:", err);
          });
        //发送pdf上传请求/end
      } catch (err) {
        console.log("红票pdf上传过程错误:", err);
      }
    },
    _fileCheck(file) {
      //文件合规判断/start
      let fileSize = file ? this.$refs.file.files[0].size : 0;
      let fileExt = file ? file.name : "";
      let extMatch = this._checkFileExt(fileExt);
      let sizeMatch = this._checkSize(fileSize);

      if (!extMatch) {
        this.$message({
          showClose: true,
          message: "注意：只能上传.pdf文件，不能上传其它类型哦~",
          type: "error",
          duration: 0
        });
        return false;
      }
      if (!sizeMatch) {
        this.$message({
          showClose: true,
          message: "注意：pdf文件大小不能超过100K哦~",
          type: "error",
          duration: 0
        });
        return false;
      }
      return true;
      //文件合规判断/end
    },
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
    _formValidate() {
      this.$refs["formWrap"].validate(valid => {
        console.log("valid:", valid);
        if (valid) {
          return true;
        } else {
          // this.$message();
          return false;
        }
      });
    },
    _submitData() {
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
            if (res.data.message.indexOf("重复") >= 0) {
              this.$message({
                showClose: true,
                message: res.data.message + ",注意发票号不能重复！",
                type: "error",
                duration: 0
              });
            } else {
              this.$message({
                showClose: true,
                message: "上传成功！",
                type: "success",
                duration: 5000
              });
            }
          }
        })
        .catch(err => {
          throw new Error("红票数据上传错误：", err);
          // console.log("红票上传返回错误：", err);
        });
    },
    _onCancel() {
      this.$refs.formWrap.resetFields();
      this.$refs.file.value = "";
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
