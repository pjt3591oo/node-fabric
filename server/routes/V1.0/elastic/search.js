/**
 * Created by bagjeongtae on 2018. 4. 15..
 */

const express = require('express');
const router = express.Router();

var elasticsearch_client = require('../../../config/elasticsearch.js');

function elasticsearchKeywordSearch(keyword){
  return new Promise((resolve, reject) => {
    elasticsearch_client.search({
      index: 'korean',
      type: 'text',
      // source: [keyword],
      query: {
        bool: {
          must: [
            {
              match: {
                text: keyword
              }
            }
          ]
        }
      },
      q: keyword
    }, (err, result) => {
      if (err) reject (err)

      resolve(result)
    })
  })
}

router.get('/', async (req, res) => {
  let { keyword } = req.query;
  let data = await elasticsearchKeywordSearch(keyword)
  res.json(data);
})



module.exports = router;

