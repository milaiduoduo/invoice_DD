module.exports = {
  apps: [{
    name: 'webAndUploadfile',
    script: 'start.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    // instances: 1,
    autorestart: true,
    restart_delay: 30000, //异常重启情况下， 延时重启时间ms
    min_uptime: 1000, //应用运行少于时间被认为是异常启动,默认ms
    max_restarts: 10, // 最大异常重启次数，即小于min_uptime运行时间重启次数；
    watch: false,
    max_memory_restart: '1G'
    // env: {
    //   NODE_ENV: 'development'
    // },
    // env_production: {
    //   NODE_ENV: 'production'
    // }
  }]
  // ,

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
