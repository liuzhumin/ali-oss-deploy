const co = require('co');
const OSS = require('ali-oss');
const path = require('path');
const fs = require('fs');
const refreshCache = require('./refreshCache')
module.exports = function (config) {
    // get mode
    const mode = process.argv[process.argv.length - 1]

    // 当前bucket
    const currentBucket = config.bucket[mode]
    // 根据环境获取bucket
    config.ossConfig.bucket = currentBucket.name

    const client = new OSS(config.ossConfig);
    const root = path.resolve(__dirname, `../../${config.path}`);
    const files = [];

    //取出所有文件夹下所有文件的路径
    function readDirSync(p) {
        const pa = fs.readdirSync(p);
        pa.forEach((e) => {
            const cur_path = `${p}/${e}`;
            const info = fs.statSync(cur_path);
            if (info.isDirectory()) {
                readDirSync(cur_path);
            } else {
                files.push(cur_path);
            }
        });
    }

    readDirSync(root)

    //上传文件
    co(function* () {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            //文件名取root后面的,添加项目文件夹，默认为空
            const projectRootPath = currentBucket.projectPath ? currentBucket.projectPath : ''
            const result = yield client.put(file.replace(root, projectRootPath), file);
            //上传成功后返回的message
            console.log(result);
        }


        // 刷新缓存
        if (currentBucket.refreshPath) {
            refreshCache({
                accessKeyId: config.ossConfig.accessKeyId,
                secretAccessKey: config.ossConfig.accessKeySecret,
            }, currentBucket.refreshPath)
        }
    }).catch(function (err) {
        console.log(err);
    });
}