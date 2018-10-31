<template>
<div>
    <el-card>
        <div slot="header" class="headerWrap">
            <el-button type="primary" size="medium" @click="onSubmit">立即上传蓝票信息</el-button>
            <el-button type="default" size="small" @click="onCancel">取消</el-button>

        </div>
        <m-blue-form></m-blue-form>
    </el-card>
</div>
</template>

<script type="text/ecmascript-6">
import blueForm from "./blueForm.vue";
export default {
  methods: {
    onSubmit() {},
    onCancel() {}
  },
  components: {
    [blueForm.name]: blueForm
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
