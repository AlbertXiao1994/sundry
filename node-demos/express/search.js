var request = require('superagent'),
    qs = require('querystring');

/** 
 * 搜索函数
 * 
 * @param {String} query - 关键词
 * @param {Function} fn - 回调函数
 * @api public
*/
module.exports = function search (query, fn) {
  request('https://api.github.com/search/repositories')
  .query({ q: query, sort: 'stars' })
  .then(function (res) {
      var obj = res.body;
      if (!obj) {
        return fn(new Error('Bad twitter response'));
      }
      
      fn(null, obj.items);
  })
};