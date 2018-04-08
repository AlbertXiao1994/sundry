var qs = require('querystring')
  , http = require('http');

/** 
 * 搜索函数
 * 
 * @param {String} query - 关键词
 * @param {Function} fn - 回调函数
 * @api public
*/

module.exports = function search(query, fn) {
  http.request({
    host: 'https://api.github.com',
    path: '/search/repositories?' + qs.stringify({q: query}) + '&sort=stars'
  }, function(res) {
    res.setEncoding('utf8');
    var body = '';

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      try {
        var obj = JSON.parse(body);
      } catch (e) {
        return fn(new Error('Bad twitter response'));
      }

      fn(null, obj.items);
    });
  }).end();
};