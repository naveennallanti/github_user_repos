const fs = require('fs');
const async = require('async');
const LineByLineReader = require('line-by-line');
const request = require('request');

const _service = require('../services/service');


module.exports = {
    _file_data_to_array: (inputFile) => {

        return new Promise((resolve, reject) => {

            let lr = new LineByLineReader(inputFile);
            let users_arr = []

            lr.on('error', (err) => {
                reject(err);
            });

            lr.on('line', (line) => {

                let arr = line.split(',');
                users_arr = users_arr.concat(arr);

            });

            lr.on('end', () => {
                resolve(users_arr);
            });

        })

    },
    get_user_repos: (users_arr) => {
        return new Promise((resolve, reject) => {
            let users_repositories = {

            }
            let extract_repositories = (dataObj) => {
                let user_repos = [];
                dataObj.forEach((item) => {
                    user_repos.push(item.name);
                })
                return user_repos;
            }
            async.each(users_arr, (item, callback) => {
                let url = "https://api.github.com/users/" + item + "/repos";

                _service._httpHandler(url).then(data => {

                    Object.assign(users_repositories, {
                        [item]: extract_repositories(data)
                    });
                    callback()
                }).catch(err => {

                    callback()
                })
            }, (err) => {
                if (!err) {
                    resolve(users_repositories);
                } else {
                    reject(err);
                }
            })
        })

    },
    success_response: (res, message, data) => {
        return res.status(200).json({
            success: true,
            err: false,
            message: message,
            data: data
        })
    },
    error_response: (res, message, err) => {
        return res.status(400).json({
            success: false,
            err: true,
            message: message,
            data: err
        })
    }
}