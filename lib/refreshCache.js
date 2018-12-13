const ALY = require('aliyun-sdk');

module.exports = function (config, path) {
    const cdn = new ALY.CDN({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            endpoint: 'https://cdn.aliyuncs.com',
            apiVersion: '2014-11-11'
        }
    );
    cdn.refreshObjectCaches({
        ObjectType: 'File',
        ObjectPath: path
    }, function (err, res) {
        console.log('refresh');
        console.log(err, res);
    });
}