const request = require('request-promise');

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

(async function(){
    try {
        let gists = await getGistList('public');
        let detail = await getGist(gists[0].id);
        console.log(Object.keys(detail.files));
    } catch(e) { console.error(e); }
})();
