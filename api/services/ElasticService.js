// var elasticsearch = require('elasticsearch');
// var host = 'localhost:9200/bank';
// var client = new elasticsearch.Client({
//   host: host,
//   log: 'trace'
// });
// exports.search = function(options, query, cb) {
// 	var client = new elasticsearch.Client({
// 		host: host
// 	});
// 	client.count(function (error, response, status) {
// 	  // check for and handle error
// 	  var count = response.count;
// 	  console.log(count);
// 	});
// 	var body = {
// 	  	query:{
// 			bool: {
// 				must_not:  { "match": { "address": "990" } }
// 			}
// 		}
// 	};
// 	var searchOpts = {

// 	  	size: 9,
// 	  	body: body,
// 	  	from: 0
// 	};
// 	sails.log.debug(JSON.stringify(searchOpts));

// 	client.search(searchOpts).then(function (resp) {
// 		client.close();
// 		sails.log.debug(JSON.stringify(resp));
// 	  	//cb(null, resp.hits);
// 	}).error(function(err) {
// 		client.close();
// 		//cb(err);
// 	});
// },
// exports.index = function(options, doc, cb){
// 	var client = new elasticsearch.Client({
// 	  host: host
// 	});
// }