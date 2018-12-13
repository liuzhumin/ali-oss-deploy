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
            projectPath: 'your project name', //可选，添加项目目录，不填默认为空
        },
    },
})
