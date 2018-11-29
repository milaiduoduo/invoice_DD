<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSave">保存修改值</el-button>
        </div>
        <el-form :model="formData" class="formWrap" size="small" ref="formWrap" label-width="140px" >
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="预设蓝票代码值">
                            <el-input v-model="formData.preBlueInvoiceCode"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                    <el-form-item label="预设红票代码值">
                            <el-input v-model="formData.preRedInvoiceCode"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="10">
                    <el-form-item label="预设销货方税号">
                            <el-input v-model="formData.preReceiverTaxNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :offset="1" :span="10">
                    <el-form-item label="预设销货方公司名称">
                            <el-input v-model="formData.preReceiverName"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import config from "@/config/paramsConfig";
export default {
  data() {
    return {
      formData: {
        preBlueInvoiceCode: "",
        preRedInvoiceCode: "",
        preReceiverTaxNo: "",
        preReceiverName: ""
      }
    };
  },
  computed: {
    preBlueInvoiceCode() {
      return this.formData.preBlueInvoiceCode;
    },
    preRedInvoiceCode() {
      return this.formData.preRedInvoiceCode;
    },
    preReceiverTaxNo() {
      return this.formData.preReceiverTaxNo;
    },
    preReceiverName() {
      return this.formData.preReceiverName;
    }
  },
  watch: {
    preBlueInvoiceCode(newVal) {
      console.log("preBlueInvoiceCode:", this.preBlueInvoiceCode);
    },
    preRedInvoiceCode(newVal) {
      console.log("preRedInvoiceCode:", this.preRedInvoiceCode);
    },
    preReceiverTaxNo(newVal) {
      console.log("preReceiverTaxNo:", this.preReceiverTaxNo);
    },
    preReceiverName(newVal) {
      console.log("preReceiverName:", this.preReceiverName);
    }
  },
  created() {
    let configObjWrap = this.$utils.getLocalStorage("hx_kp_config");
    console.log("configObjWrap:", configObjWrap);
    if (!configObjWrap) {
      this.$showMessage(
        "配置文件读取异常，请退出系统，重新登录获取！",
        "error"
      );
      return;
    }
    let configObj = JSON.parse(configObjWrap);
    console.log("configObjWrap:", configObj);
    this.formData.preBlueInvoiceCode = configObj.preBlueInvoiceCode;
    this.formData.preRedInvoiceCode = configObj.preRedInvoiceCode;
    this.formData.preReceiverTaxNo = configObj.receiverTaxNo;
    this.formData.preReceiverName = configObj.receiverName;
  },
  methods: {
    onSave() {
      this.$utils.setLocalStorage({
        hx_kp_config: JSON.stringify({
          receiverTaxNo: this.formData.preReceiverTaxNo,
          receiverName: this.formData.preReceiverName,
          preBlueInvoiceCode: this.formData.preBlueInvoiceCode,
          preRedInvoiceCode: this.formData.preRedInvoiceCode
        })
      });
      let configObjWrap = this.$utils.getLocalStorage("hx_kp_config");
      let configObj = JSON.parse(configObjWrap);
      if (
        this.formData.preBlueInvoiceCode === configObj.preBlueInvoiceCode &&
        this.formData.preRedInvoiceCode === configObj.preRedInvoiceCode &&
        this.formData.preReceiverTaxNo === configObj.receiverTaxNo &&
        this.formData.preReceiverName === configObj.receiverName
      ) {
        this.$showMessage("修改成功！", "success");
      } else {
        this.$showMessage("修改失败！", "error");
      }
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
