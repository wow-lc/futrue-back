var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');

var pageQuery = function (page, pageSize, Model, populate, queryParams, sortParams) {
    var start = (page - 1) * pageSize;
    var $page = {
        pageNumber: page
    };
    return new Promise((resolve, reject) => { 
        async.parallel({
            totalCount: function (done) {  // 查询数量
                Model.countDocuments(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            tableData: function (done) {   // 查询一页的记录
                Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            if(err) {
                reject(err);
                return;
            }
            var count = results.count;
            $page.totalCount = (count - 1) / pageSize + 1;
            $page.tableData = results.records;
            resolve(results);
        })
    });
};

module.exports = {
    pageQuery: pageQuery
};