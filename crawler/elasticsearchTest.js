var elasticsearch_client = require('./elasticsearchData');

function elasticsearchAllSearch(){
  let keyword = '블로그'

  return new Promise((resolve, reject) => {
    elasticsearch_client.search({
      index: 'korean',
      type: 'text',
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
      from : 0, size : 10,
      q: keyword
    }, (err, result) => {
      if (err) reject (err)

      resolve(result)
    })
  })
}

async function start(){
  let dataset = await elasticsearchAllSearch();


  dataset.hits.hits.forEach(item => {
    console.log(item._source)
  })
  console.log(dataset.hits)
  console.log(dataset.hits.total)
}

start()
