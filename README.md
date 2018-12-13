### 部署静态资源到阿里云oss上，可根据发布模式选择不同的bucket，这里包括pro(正式)和test(测试)两种模式


### install
```
npm install ali-oss-deploy -S

```

### Add a deploy configuration file (deploy.js)
```
const deploy = require('ali-oss-deploy')

deploy({
    path: '../dist',   // 改为自己的静态资源目录
    ossConfig: {   // oss配置参数
        region: 'your region',
        accessKeyId: 'your accessKeyId',
        accessKeySecret: ' your accessKeySecret',
    },
    bucket: {
        pro: {
            name: 'your production bucket name',
            refreshPath: 'your refresh url', //可选，deploy后刷新缓存，必需保证url正确
        },
        test: {
            name: 'your test bucket name',
            projectPath: 'your project name', //可选，添加项目文件夹(需修改webpack的baseUrl,以保证资源文件路径正确)，不填默认为空
        },
    },
})

```

### Add a command line to package.json
```
"scripts": {

    "deploy": "node config/deploy.js pro",   // pro
    "deploy:test": "node config/deploy.js test",  //test

  },

```

### deploy - Command Line

```
npm run deploy    // mode-pro

npm run deploy:test    // mode-test

```





