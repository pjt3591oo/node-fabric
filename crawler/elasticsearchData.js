var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client({
  host: '0.0.0.0:9200',
  index: 'korea'
});

module.exports = client;
