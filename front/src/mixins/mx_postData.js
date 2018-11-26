// import axios from "axios";
export default {
  data() {
    return {
      mx1: ''
    }
  },
  methods: {
    async _postData(postData, spec_url) {
      try {
        console.log("postData:", postData, "spec_url:", spec_url);
        let res = await this.$reqPost(spec_url, postData);
        console.log("async 方式 res:", res);
        if (res.data.code == 0 && res.data.isSuccess) {
          if (res.data.message.indexOf('成功') >= 0) {
            this.$showMessage(res.data.message, 'success');
            this.$router.push({
              path: '/invoiceBlue/queryOrder'
            });
          } else if (res.data.message.indexOf("重复") >= 0) {
            this.$showMessage(res.data.message + ",注意发票号不能重复！", 'error');
          } else {
            this.$showMessage(res.data.message + ",注意发票号不能重复！", 'error');
          }
        } else if (!res.data.isSuccess) {
          console.log("isSuccess==false:::", res.data.message);
          throw new Error(res.data.message);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  }
}
