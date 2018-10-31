<template>
<div class="redWrap">
    <el-card>
        <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSubmit">立即上传红票信息</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
        </div>
        <div class="redFormWrap">
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
                        <el-form-item label="原蓝票代码" prop="blueInvoiceCode">
                            <el-input v-model="formData.blueInvoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="原蓝票号码" prop="blueInvoiceNo">
                            <el-input v-model.number="formData.blueInvoiceNo"></el-input>
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
                        <el-upload
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
                        </el-upload>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
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
  methods: {
    onSubmit() {},
    onCancel() {},
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
</style>
