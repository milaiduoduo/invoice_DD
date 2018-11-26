// import axios from "axios";
import config from "@/config/paramsConfig";
export default {
  data() {
    return {
      ivcType: '',
      config: config,
      formData: {
        orderId: "",
        invoiceCode: "",
        invoiceNo: "",
        ivcTitle: "",
        totalPrice: "",
        invoiceTime: "",
        pdfPath: "",
        receiverTaxNo: "",
        receiverName: "",
        blueInvoiceCode: "",
        blueInvoiceNo: ""
      },
      formRules: {
        orderId: [{
          required: true,
          message: "订单编号不能为空",
          trigger: "blur"
        }],
        invoiceCode: [{
          required: true,
          message: "发票代码不能为空",
          trigger: "blur"
        }],
        invoiceNo: [{
          required: true,
          message: "发票号码不能为空",
          trigger: "blur"
        }],
        ivcTitle: [{
          required: true,
          message: "发票抬头不能为空",
          trigger: "blur"
        }],
        receiverTaxNo: [{
          required: true,
          message: "销货方税号不能为空",
          trigger: "blur"
        }],
        receiverName: [{
          required: true,
          message: "销货方公司名称不能为空",
          trigger: "blur"
        }],
        totalPrice: [{
            required: true,
            message: "发票金额不能为空",
            trigger: "blur"
          },
          {
            type: "number",
            message: "开票金额需要包含两位小数",
            trigger: "blur"
          }
        ],
        invoiceTime: [{
          type: "date",
          required: true,
          message: "开票日期不能为空",
          trigger: "change"
        }],
        blueInvoiceCode: [{
          required: true,
          message: "原蓝票代码不能为空",
          trigger: "blur"
        }],
        blueInvoiceNo: [{
          required: true,
          message: "原蓝票号码不能为空",
          trigger: "blur"
        }],
        pdfPath: [{
          required: true,
          message: "pdf文件不能为空",
          trigger: "change"
        }]
      }
    }
  },
  methods: {
    _uploadFile(e, ivcTypeName) {
      console.log('在mixin的js中this:', this);
      this.ivcType = ivcTypeName;
      let tempPath = e.target.value;
      let file = e.target.files[0];
      console.log("file:", file);
      this.formData.pdfPath = tempPath;

      //input file必录项检查
      //只是为了错误提示的显示，并不返回任何东西
      this.$refs["formWrap"].validateField("pdfPath");
      if (!tempPath) return;

      //文件合规检查
      let checkResult = this._fileCheck(file);
      console.log("文件合规检查结果：", checkResult);
      if (!checkResult) {
        //清空不合规的文件的显示值
        // console.log("input value:", this.$refs.file.value);
        // 两者需要同时清空，缺一不可
        this.$refs.file.value = "";
        this.formData.pdfPath = "";
        // console.log('this.$refs.file.value，this.formData.pdfPath:', this.$refs.file.value, "|", this.formData.pdfPath)
        return;
      }


      //发送pdf上传请求
      //let formData = new FormData(this.$refs.formWrap.$el);
      // console.log("formData.get(file):", formData.get("file"));
      // console.log("this.$refs.file: ", this.$refs.file.files[0]);

      let formData = new FormData();
      formData.append("mFile", file);

      // axios.post("/fileApis/fileApi/fileUpload", formData, {
      this.$reqPost("/fileApis/fileApi/fileUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("上传接口返回：", res.data.data.path);
          let pdf_relativePath = res.data.data.path;
          // console.log("pdf_relativePath:", pdf_relativePath);
          if (!pdf_relativePath) {
            this.$showMessage("pdf上传失败，请重新再传 ！", "error");
            // this.$message({
            //   showClose: true,
            //   message: "pdf上传失败，请重新再传 ！",
            //   type: "error",
            //   duration: 0
            // });
            return;
          }
          // console.log("config.filePathDirect:", config);
          // 把上传路径设置成后台api要求的样子
          //D:\APIService\SourceInvoicePDF
          let tempArray = pdf_relativePath.split("\\");

          tempArray = pdf_relativePath.split(config.filePathDirect);
          pdf_relativePath = tempArray[tempArray.length - 1];
          this.formData.pdfPath = encodeURIComponent(pdf_relativePath);
          // console.log("pdf_relativePath:", pdf_relativePath);
          // console.log("this.formData.pdfPath:", this.formData.pdfPath);

          // this.$message({
          //   showClose: true,
          //   message: res.data.path,
          //   type: "success"
          // });
        })
        .catch(err => {
          throw new Error(`${this.ivcType}pdf上传错误:`, err);
          console.log(`${this.ivcType}pdf上传错误:`, err);
        });
      //发送pdf上传请求/end
    },
    _fileCheck(file) {
      //文件合规判断/start
      let fileSize = file ? this.$refs.file.files[0].size : 0;
      let fileExt = file ? file.name : "";
      let extMatch = this._checkFileExt(fileExt);
      let sizeMatch = this._checkSize(fileSize);

      if (!extMatch) {
        this.$showMessage("注意：只能上传.pdf文件，不能上传其它类型哦~", "error");
        // this.$message({
        //   showClose: true,
        //   message: "注意：只能上传.pdf文件，不能上传其它类型哦~",
        //   type: "error",
        //   duration: 0
        // });
        return false;
      }
      if (!sizeMatch) {
        this.$showMessage("注意：pdf文件大小不能超过100K哦~", "error");
        // this.$message({
        //   showClose: true,
        //   message: "注意：pdf文件大小不能超过100K哦~",
        //   type: "error",
        //   duration: 0
        // });
        return false;
      }
      return true;
      //文件合规判断/end
    },
    _checkFileExt(path) {
      if (!path.match(/.pdf$/i)) {
        return false;
      }
      return true;
    },
    _checkSize(fileSize) {
      let maxSize = 100 * 1024;
      return fileSize < maxSize;
    },
    _formValidate() {
      this.$refs["formWrap"].validate(valid => {
        console.log("valid:", valid);
        if (valid) {
          return true;
        } else {
          // this.$message();
          return false;
        }
      });
    }
  }
}
