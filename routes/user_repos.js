const express = require('express');
const router = express.Router();
const request = require('request');
const multer = require('multer');
const commonFun = require('../helpers/_helper');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})
router.post('/get_user_repos', upload.single('file'), (req, res) => {
    if (!req.file) {
        return commonFun.error_response(res, "file is required and field as file", null);
    }
    let inputFile = './uploads/' + req.file.originalname;

    commonFun._file_data_to_array(inputFile).then(data => {

        commonFun.get_user_repos(data).then(user_repos => {

            return commonFun.success_response(res, "successfully fetched users repositories", user_repos);
        }).catch(err => {

            return commonFun.error_response(res, "unable to fetch users repositories", err);
        })
    }).catch(err => {
        
        return commonFun.error_response(res, "unable to fetch users repositories", err);
    })

});

module.exports = router;