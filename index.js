const http = require('http');
const querystring = require('querystring');
const queryLiveRoomInfo = require('./bilibili-danmu-info-api.js');
const port = 3000;

const errorMaker = (res, err) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('ouch! something error: ' + err);
};

const server = http.createServer((req, res) => {
    // 共享
    res.setHeader('Access-Control-Allow-Origin', '*');

    const queryIndex = req.url.indexOf('?');
    if (queryIndex === -1) return errorMaker(res, 'no query string in url.');
    let roomId = null;
    try {
        ({roomId} = JSON.parse(JSON.stringify(querystring.parse(req.url.slice(queryIndex + 1, req.url.length)))));
    } catch (e) {
        return errorMaker(res, 'parse roomId from query string failure.');
    }

    if (!roomId) return errorMaker(res, 'has no roomId in query string.');

    queryLiveRoomInfo(roomId).then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
    }).catch(e => {
        return errorMaker(res, e);
    });

});

server.listen(port, () => {
    console.log(`listening port:${port}`);
});