<template>
<div>
    <el-card>
        <el-form ref="dataFrom" :model="formData" status-icon :rules="formRules" label-width="120px">
           <el-row>
               <el-col :offset="1" :span="10">
                    <el-form-item  label="原密码" prop="origiPWD">
                        <el-input type="password" v-model="formData.origiPWD"/>
                    </el-form-item>
                    <el-form-item  label="新密码" prop="newPWD">
                        <el-input type="password" v-model="formData.newPWD"/>
                    </el-form-item>
                    <el-form-item  label="再次输入新密码" prop="newPWDAgain">
                        <el-input type="password" v-model="formData.newPWDAgain"/>
                    </el-form-item>
                </el-col>            
           </el-row>
           <el-row>
               <el-col :offset="1" :span="10">
                    <el-form-item label="">
                        <el-button class="queryBtn" type="primary" size="large" @click="onSubmit">修改密码</el-button>
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
    const validateOrigiPWD = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("原密码不能为空"));
      }
      let res = await this.$reqGet(
        `/dataApis/api/authentication?userName=admin&pwd=${
          this.formData.origiPWD
        }`
      );
      if (res.data && res.data.success) {
        callback();
      } else {
        callback(new Error("原密码不正确"));
      }
    };
    const validateNewPWD = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else {
        if (value.length < 6) {
          callback(new Error("新密码长度不能小于六位"));
        }
        if (value == this.formData.origiPWD) {
          callback(new Error("新密码不能与原密码一样"));
        }
        if (!this.formData.newPWDAgain) {
          this.$refs.dataFrom.validateField("newPWDAgain");
        }
        callback();
      }
    };
    const validatePWDAgain = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value != this.formData.newPWD) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        origiPWD: "",
        newPWD: "",
        newPWDAgain: ""
      },
      formRules: {
        origiPWD: [
          //   { required: true, trigger: "blur", message: "新密码不能为空" }
          { required: true, trigger: "blur", validator: validateOrigiPWD }
        ],
        newPWD: [
          { required: true, trigger: "blur", validator: validateNewPWD }
        ],
        newPWDAgain: [
          { required: true, trigger: "blur", validator: validatePWDAgain }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      this.$refs["dataFrom"].validate(async (valid, object) => {
        console.log("valid, object:", valid, object);
        if (!valid) return;
        let res = await this.$reqPut("/dataApis/api/user/", {
          UserId: "3",
          UserPwd: this.formData.newPWD
        });
        console.log("res:", res);
        if (res.data && res.data.success) {
          this.$showMessage("密码修改成功！", "success");
          this.$refs.dataFrom.resetFields();
        }
      });
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
