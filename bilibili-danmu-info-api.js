const https = require('https');

const optionsMaker = (roomId) => ({
    hostname: 'api.live.bilibili.com',
    port: 443,
    path: `/xlive/web-room/v1/index/getDanmuInfo?type=0&id=${roomId}`,
    method: 'GET',
});

module.exports = queryLiveRoomInfo = (roomId) => {
    return new Promise(((resolve, reject) => {
        const req = https.request(optionsMaker(roomId), res => {
            res.on('data', d => {
                resolve(JSON.parse(d));
            });
        });
        req.on('error', error => {
            reject(error);
        });
        req.end();
    }));
};