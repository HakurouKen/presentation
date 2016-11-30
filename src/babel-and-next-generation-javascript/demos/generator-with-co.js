const request = require('request-promise');
const co = require('co');

function getGistList(type){
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    });
}

function getGist(id,callback) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    });
}

co(function* (){
    try {
        let gists = yield getGistList('public');
        let detail = yield getGist(gists[0].id);
        console.log(Object.keys(detail.files));
    } catch(e) { console.error(e); }
});
