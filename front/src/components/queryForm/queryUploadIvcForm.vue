<template>
<div class="queryFormWrap">
    <el-form ref="ivcQueryform" size="mini" label-width="100px" :model="queryFormData" :rules="formRules">
                 <el-row>
                     <el-col :span="5">
                         <el-form-item label="发票类型：">
                             <el-select :disabled="blueOnly" v-model="queryFormData.selectedInvoiceType" placeholder="请选择" @change="optionChange">
                                <el-option
                                    v-for="item in invoiceTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="订单编号：">
                            <el-input v-model="queryFormData.orderId" placeholder="请输入订单编号"></el-input>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="发票代码：">
                            <el-input v-model="queryFormData.invoiceCode" placeholder="请输入发票代码"></el-input>
                         </el-form-item>
                     </el-col>
                     
                     <el-col :span="2">
                            <el-button class="queryBtn" type="primary" size="small" @click="onQuery">查询</el-button>
                     </el-col>
                 </el-row>
                 <el-row>
                     <el-col :span="10">
                         <el-form-item label="开票日期：" prop="invoiceTimeGap">
                             <el-date-picker v-model="queryFormData.invoiceTimeGap" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
                         </el-form-item>
                     </el-col>
                     <el-col :span="5">
                         <el-form-item label="发票号码：">
                            <el-input v-model.number="queryFormData.invoiceNo" placeholder="请输入发票号码"></el-input>
                         </el-form-item>
                     </el-col>
                 </el-row>
            </el-form>
</div>
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
import config from "@/config/paramsConfig";
export default {
  name: "query-ivc-form",
  props: ["blueOnly"],
  data() {
    var dateGapValidate = (rule, value, callback) => {
      // console.log("dateGapValidate value:", value);
      if (!value) {
        console.log("null为啥不进来value:", value);
        callback();
        return;
      }
      console.log("日期间隔value:", value);
      let startTime = value[0].getTime();
      let endTime = value[1].getTime();
      // console.log("startTime:", startTime);
      if (startTime < 0) {
        // value.length = 0;
        callback(new Error("日期不能早于1970年1月1日!"));
      }
      if (endTime - startTime > 92 * 24 * 60 * 60 * 1000) {
        // value.length = 0;
        callback(new Error("日期跨度不能超过三个月，约等于92天！"));
      }
      callback();
    };
    return {
      queryFormData: {
        selectedInvoiceType: this.blueOnly
          ? config.ivcType.blue.key
          : config.ivcType.all.key,
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
        invoiceTimeGap: null
      },
      invoiceTypeOptions: [
        {
          value: 0,
          label: "所有"
        },
        {
          value: 1,
          label: "蓝票"
        },
        {
          value: 2,
          label: "红票"
        }
      ],
      formRules: {
        invoiceTimeGap: [
          // {
          //   required: true,
          //   message: "订单编号不能为空",
          //   trigger: "blur"
          // },
          { validator: dateGapValidate, trigger: "blur" }
        ]
      }
    };
  },
  // watch: {
  //   "queryFormData.invoiceTimeGap"(newVal, oldVal) {
  //     console.log("newVal, oldVal:", newVal, oldVal);
  //     if (!newVal) {
  //     }
  //   }
  // },
  methods: {
    onQuery() {
      console.log("queryForm子组件触发！");
      console.log('this.$refs["ivcQueryform"]:', this.$refs["ivcQueryform"]);
      this.$refs["ivcQueryform"].validate(valid => {
        console.log("queryForm子组件触发！但数据验证不通过！");
        if (!valid) return;
        console.log("queryForm子组件触发！切给父组件传递参数！");
        this.$emit("showQueryCondition", this.queryFormData);
      });
      // this.$refs["ivcQueryform"].validateField("invoiceTimeGap");
    },
    optionChange() {
      this.$emit("ivcTypeOptionChange");
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.queryFormWrap {
  .queryBtn {
    position: absolute;
    top: -3px;
    margin-left: 40px;
    padding: 9px 30px;
    font-size: 14px;
  }
}
</style>
