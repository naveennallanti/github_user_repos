const request = require('request');

module.exports = {
    _httpHandler: (url) => {
        return new Promise((resolve, reject) => {
            let options = {
                url: url,
                headers: {
                    'User-Agent': 'request'
                }
            };

            let callback = (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let info = JSON.parse(body);
                    resolve(info);
                } else {
                    reject(error)
                }
            }

            request(options, callback);
        })
    }
}