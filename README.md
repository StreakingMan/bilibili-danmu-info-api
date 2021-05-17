## B站弹幕信息接口请求代理

一个简单的node服务，代理请求B站的弹幕信息接口，代理接口信息如下
```javascript
const optionsMaker = (roomId) => ({
    hostname: 'api.live.bilibili.com',
    port: 443,
    path: `/xlive/web-room/v1/index/getDanmuInfo?type=0&id=${roomId}`,
    method: 'GET',
});
```

请求示例
```shell
curl http://127.0.0.1:3000?roomId=6
```
若原始接口正常，则范围其内容
```json
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "group": "live",
        "business_id": 0,
        "refresh_row_factor": 0.125,
        "refresh_rate": 100,
        "max_delay": 5000,
        "token": "aUDi4WJN3Up6lKrWisEgC_a3nxMqVshcEL2f92WSa-s9fCmBY2_sOu3jsaBzaaPkFeqn0AetPnvj-7mEuRd3YF2FVmP7Mx7cpov_eWEwYmAwSjJUZ0s8R8GNES3evW42A6ak65XXansXXQ==",
        "host_list": [
            {
                "host": "ks-bj-live-comet-01.chat.bilibili.com",
                "port": 2243,
                "wss_port": 443,
                "ws_port": 2244
            },
            {
                "host": "tx-bj-live-comet-02.chat.bilibili.com",
                "port": 2243,
                "wss_port": 443,
                "ws_port": 2244
            },
            {
                "host": "broadcastlv.chat.bilibili.com",
                "port": 2243,
                "wss_port": 443,
                "ws_port": 2244
            }
        ]
    }
}
```