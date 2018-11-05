<template>
<div class="blueFormWrap">
    <div class="title">发票信息</div>
    <el-form class="formWrap" size="small" ref="formWrap" label-width="120px" :model="formData" :rules="formRules">
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="订单编号" prop="orderId">
                        <el-input v-model="formData.orderId"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="发票代码" prop="invoiceCode">
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
                    <el-form-item label="开票日期" prop="invoiceTime">
                        <el-date-picker v-model="formData.invoiceTime" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1">
                    <el-form-item label="PDF上传">
                        <!-- <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload> -->
                        <input id="file" ref="file" type="file" name="file" @change="uploadFile" accept="application/pdf">
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

export default {
  name: "m-blue-form",
  props: ["eformData"],
  data() {
    return {
      formData: {
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
        ivcTitle: "",
        totalPrice: "",
        invoiceTime: ""
      },
      formRules: {
        orderId: [
          { required: true, message: "订单编号不能为空", trigger: "blur" }
        ],
        invoiceCode: [
          { required: true, message: "发票代码不能为空", trigger: "blur" }
        ],
        invoiceNo: [
          { required: true, message: "发票号码不能为空", trigger: "blur" }
        ],
        ivcTitle: [
          { required: true, message: "发票抬头不能为空", trigger: "blur" }
        ],
        totalPrice: [
          { required: true, message: "发票金额不能为空", trigger: "blur" },
          {
            type: "number",
            message: "开票金额需要包含两位小数",
            trigger: "blur"
          }
        ],
        invoiceTime: [
          {
            type: "date",
            required: true,
            message: "开票日期不能为空",
            trigger: "change"
          }
        ]
      },
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  created() {
    this.formData.orderId = this.eformData.orderId;
    this.formData.invoiceCode = this.eformData.invoiceCode;
    this.formData.invoiceNo = this.eformData.invoiceNo;
    this.formData.ivcTitle = this.eformData.ivcTitle;
    this.formData.totalPrice = this.eformData.totalPrice;
    this.formData.invoiceTime = this.eformData.invoiceTime;
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
    uploadFile(e) {
      let tempPath = e.target.value;
      let fileSize = this.$refs.file.files[0].size;
      // console.log(this.$refs.file.files[0]);
      let extMatch = this._checkFileExt(tempPath);
      let sizeMatch = this._checkSize(fileSize);
      // console.log(this._checkSize(fileSize));
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

      let url = "/fileUpload";
      let formData = new FormData(this.$refs.formWrap.$el);
      this.$reqPost("http://127.0.0.1:3000/post", formData)
        .then(res => {
          console.log("上传接口返回：", res);
          this.$message({
            showClose: true,
            message: res.data.path,
            type: "success"
          });
        })
        .catch(err => {
          console.log("blue page query Test err:", err);
        });
    },
    onSave() {
      console.log(this.formData);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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
