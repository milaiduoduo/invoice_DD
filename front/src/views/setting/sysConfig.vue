<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSave">保存修改值</el-button>
        </div>
        <el-form :model="formData" class="formWrap" size="small" ref="formWrap" label-width="120px" >
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
        preBlueInvoiceCode: config.preBlueInvoiceCode,
        preRedInvoiceCode: config.preRedInvoiceCode
      }
    };
  },
  computed: {
    preBlueInvoiceCode() {
      return this.formData.preBlueInvoiceCode;
    },
    preRedInvoiceCode() {
      return this.formData.preRedInvoiceCode;
    }
  },
  watch: {
    preBlueInvoiceCode(newVal) {
      console.log("preBlueInvoiceCode:", this.preBlueInvoiceCode);
    },
    preRedInvoiceCode(newVal) {
      console.log("preRedInvoiceCode:", this.preRedInvoiceCode);
    }
  },
  methods: {
    onSave() {
      this.$showMessage("修改成功", "success");
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
