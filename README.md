## B站弹幕信息接口请求代理

### 简介

一个简单的node服务，代理请求B站的弹幕信息接口，代理接口信息如下

```javascript
const optionsMaker = (roomId) => ({
    hostname: 'api.live.bilibili.com',
    port: 443,
    path: `/xlive/web-room/v1/index/getDanmuInfo?type=0&id=${roomId}`,
    method: 'GET',
});
```

闲置的服务器放着挺浪费资源，跑了一个服务供大家使用（已设置好跨域原资源共享头部），地址为
`http://bilibilidanmuproxy.streakingman.com`

#### 请求示例

携带B站房间号roomId queryString即可

```shell
curl http://bilibilidanmuproxy.streakingman.com/?roomId=6
```

### 返回示例

若原始接口正常，则返回其原始内容

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

### 使用场景

用于B站弹幕交互应用的开发，ws不受跨域限制，获取到房间弹幕信息后，可通过hostList中的节点直接获取实时弹幕