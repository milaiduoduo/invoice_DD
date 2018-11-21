import axios from "axios";
export default {
  data() {
    return {
      mx1: ''
    }
  },
  methods: {
    _postData(postData, spec_url) {
      console.log("postData:", postData, "spec_url:", spec_url);
      axios
        .post(spec_url, postData)
        .then(res => {
          console.log(`票据上传返回：`, res);
          if (res.data.code == 0 && res.data.isSuccess) {
            if (res.data.message.indexOf('成功') >= 0) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "success",
                duration: 5000
              });
              this.$router.push({
                name: 'queryOrder'
              })
            } else if (res.data.message.indexOf("重复") >= 0) {
              this.$message({
                showClose: true,
                message: res.data.message + ",注意发票号不能重复！",
                type: "error",
                duration: 0
              });
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "warning",
                duration: 0
              });
            }
            // if (res.data.message.indexOf("重复") >= 0) {
            //   this.$message({
            //     showClose: true,
            //     message: res.data.message + ",注意发票号不能重复！",
            //     type: "error",
            //     duration: 0
            //   });
            // } else {
            //   this.$message({
            //     showClose: true,
            //     message: res.data.message,
            //     type: "success",
            //     duration: 5000
            //   });
            // }
          }
        })
        .catch(err => {
          throw new Error("发票数据上传错误：", err);
          // console.log("红票上传返回错误：", err);
        });
    },
  }
}
