let config = {
  receiverTaxNo: "91650103599163841F",
  receiverName: "乌鲁木齐华鑫智宏商贸有限公司",
  preBlueInvoiceCode: "065001800111",
  preRedInvoiceCode: "065001800112",
  ivcType: {
    all: {
      key: 0,
      name: "所有"
    },
    blue: {
      key: 1,
      name: "蓝票"
    },
    red: {
      key: 2,
      name: "红票"
    }
  },
  filePathInServer: "D:\\APIService\\SourceInvoicePDF",
  filePathDirect: "\\SourceInvoicePDF\\",
  url: {
    redIvcUploadUrl: '/dataApis/api/invoice-red',
    blueIvcUploadUrl: '/dataApis/api/invoice-blue',
    orderQueryUrl: '/dataApis/api/order'
  }
}

export default config;
