var request = require('request-promise');

function getGistList(type) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + type,
        json: true
    });
}

function getGist(id) {
    return request({
        headers: { 'User-Agent': 'request' },
        url: 'https://api.github.com/gists/' + id,
        json: true
    });
}

getGistList('public').then(gist => gist[0].id)
    .then(getGist).then(detail => console.log(Object.keys(detail.files)))
    .catch(err => console.error(err));
