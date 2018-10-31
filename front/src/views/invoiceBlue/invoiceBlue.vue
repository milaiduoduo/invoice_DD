<template>
<div class="blueWrap">
    <el-card ref="invoiceWrap">
        <!-- <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSubmit">立即上传蓝票信息</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onAddInvoice">继续录入蓝票</el-button>
        </div> -->
        <div v-for="(item,index) in formList" :key="index"><m-blue-form :eformData="item"></m-blue-form></div> 
        <div class="footer">
            <el-button type="primary" @click="onAllSubmit">蓝票录入完毕，上传！</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>
            <el-button type="success" size="small" @click="onAddInvoice"> + 继续录入蓝票</el-button>   
        </div>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import blueForm from "./blueForm.vue";
let initFormData = {
  orderId: "",
  invoiceCode: "",
  invoiceNo: "",
  ivcTitle: "",
  totalPrice: "",
  invoiceTime: ""
};
export default {
  data() {
    return {
      formList: []
    };
  },
  methods: {
    onAllSubmit() {
      /*获取所有From字段的值，并发送请求*/
      console.log(this.formList);
    },
    onCancel() {
      this.formList.length = 0;
      this.formList.push(initFormData);
    },
    onAddInvoice() {
      console.log(initFormData);
      this.formList.push(initFormData);
    }
  },
  components: {
    [blueForm.name]: blueForm
  },
  created() {
    this.formList.push(initFormData);
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.blueWrap {
  .footer {
    margin-top: 10px;
  }
}
</style>
