var request = require('request');

function getGistList(type,callback) {
    request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    },function(err, result, data){
        if (err) throw err;
        callback && callback(data);
    });
}

function getGist(id,callback) {
    request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    },function(err, result, data){
        if (err) throw err;
        callback && callback(data);
    });
}

getGistList('public',function(gists){
    getGist(gists[0].id, function(detail){
        console.log(Object.keys(detail.files));
    });
});
