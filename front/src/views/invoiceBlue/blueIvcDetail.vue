<template>
    <div class="blueDetailWrap">
        <el-card>
        <!-- <div slot="header" class="headerWrap clearfix"> -->
          <span class="sectionTitle">蓝票详情：</span>
        <!-- </div> -->
        <el-form class="formWrap" size="small" ref="formWrap" label-width="120px" :model="formData">
                <section class="category">订单信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单编号" prop="orderId">
                            <el-input :disabled="true" v-model="formData.orderId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="用户应付金额" prop="orderId">
                            <el-input :disabled="true" v-model="formData.orderPayment"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <section class="category">发票信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票代码" prop="invoiceCode">
                            <el-input :disabled="true" v-model="formData.invoiceCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票号码" prop="invoiceNo">
                            <el-input :disabled="true" v-model.number="formData.invoiceNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="发票抬头" prop="ivcTitle">
                            <el-input :disabled="true" v-model="formData.ivcTitle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票金额" prop="totalPrice">
                            <el-input :disabled="true" v-model.number="formData.totalPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票人" prop="drawer ">
                            <el-input :disabled="true" v-model="formData.drawer"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收款人" prop="payee">
                            <el-input :disabled="true" v-model="formData.payee"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="开票日期" prop="invoiceTime">
                            <el-date-picker :disabled="true" v-model="formData.invoiceTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="销货方税号" prop="receiverTaxNo">
                            <el-input :disabled="true" v-model="formData.receiverTaxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="销货方公司名称" prop="receiverName">
                            <el-input :disabled="true" v-model="formData.receiverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1">
                        <el-form-item label="PDF查看">
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- consigneeInfo 收货人基本信息 -->
                <section class="category">收货人信息</section>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人姓名" prop="receiverTaxNo">
                            <el-input :disabled="true" v-model="formData.receiverTaxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人电话" prop="receiverName">
                            <el-input :disabled="true" v-model="formData.receiverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="收货人地址" prop="receiverTaxNo">
                            <el-input :disabled="true" v-model="formData.receiverTaxNo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" :span="10">
                        <el-form-item label="订单支付方式" prop="receiverName">
                            <el-input :disabled="true" v-model="formData.receiverName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
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
        ivcTitle: "",
        totalPrice: "",
        invoiceTime: "",
        pdfPath: "",
        receiverTaxNo: "91650103599163841F",
        receiverName: "乌鲁木齐华鑫智宏商贸有限公司"
      }
    };
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.blueDetailWrap {
  padding-bottom: 20px;
}
.sectionTitle {
  display: block;
  padding-bottom: 11px;
  margin-bottom: 20px;
  border-bottom: 1px dashed #ccc;
  font-weight: bold;
}
</style>
