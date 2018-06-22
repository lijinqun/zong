const config = {
  // 生产环境（正式）
  pro: {
    appID: 'wx7895a1f16a855175',
    appSecret: 'cb709715d95f1bef3b138b92334c454c',
    // serverApiUrl: 'http://1.zouwei.hk/chuangshi',
    // serverUrl: 'http://1.zouwei.hk',
    serverApiUrl: 'http://1.zouwei.hk/chuangshi',
    serverUrl: 'http://1.zouwei.hk',
    // imgserverUrl: 'http://1.zouwei.hk/chuangshi',
    imgserverUrl: 'http://1.zouwei.hk/chuangshi',
    payWechat: true, //判断是走app 还是微信     true走微信 false 走app
  },
  // 生产环境（开发）
  dev: {
    appID: 'wx5192b26feb7c2c04',
    appSecret: '7508eee8b2430046751c867e5cec85de',
    serverApiUrl: 'http://ccc.cliantech.com/chuangshi',
    serverUrl: 'http://ccc.cliantech.com',
    imgserverUrl: 'http://ccc.cliantech.com/chuangshi',
    payWechat: true, //判断是走app 还是微信      true走微信 false 走app
  },
  // 本地环境
  local: {
    appID: 'wx5192b26feb7c2c04',
    appSecret: '7508eee8b2430046751c867e5cec85de',
    serverApiUrl: 'http://dev.cliantech.com/chuangshi',
    // serverApiUrl: 'http://1.zouwei.hk/chuangshi',
    serverUrl: 'http://dev.cliantech.com',
    // imgserverUrl: 'http://dev.cliantech.com/chuangshi',
    imgserverUrl: 'http://1.zouwei.hk/chuangshi',
    payWechat: true, //判断是走app 还是微信      true走微信 false 走app
    // imgserverUrl: 'http://dev.cliantech.com/chuangshi',
  },
  // 测试服务器环境
  test: {
    appID: 'wx5192b26feb7c2c04',
    appSecret: '7508eee8b2430046751c867e5cec85de',
    // appID: 'wx8e32b1c9f97a2ee8',      //ccc
    // appID: 'wx7895a1f16a855175',
    // appSecret: '9595ac7fa410b2ce2fed96a17860b65c',
    // appSecret: 'cb709715d95f1bef3b138b92334c454c',
    // serverApiUrl: 'http://ccc.cliantech.com/chuangshi',
    // serverUrl: 'http://ccc.cliantech.com',
    // imgserverUrl: 'http://dev.cliantech.com/chuangshi',
    serverApiUrl: 'http://dev.cliantech.com/chuangshi',
    serverUrl: 'http://dev.cliantech.com',
    // serverUrl: 'http://zhidan.cliantech.com',
    imgserverUrl: 'http://1.zouwei.hk/chuangshi',
    payWechat: true, //判断是走app 还是微信      true走微信 false 走app

  }
}

let baseInfo
switch (process.env.NODE_ENV) {
  case 'production':
    baseInfo = config.pro
    break
  case 'test':
    baseInfo = config.test
    break
  case 'development':
    baseInfo = config.dev
    break
  case 'local':
    baseInfo = config.local
    break
}

export default baseInfo

