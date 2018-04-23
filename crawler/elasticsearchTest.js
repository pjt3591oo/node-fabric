var elasticsearch_client = require('./elasticsearchData');

function elasticsearch_save({id, text, link}){
  return new Promise((resolve, reject) => {
    elasticsearch_client.create({
      index: 'korean',
      type: 'text',
      id: id,
      body: {
        text: text,
        link: link
      }
    }, (err, result) => {
      if (err) {

        let errMsg = {
          status: err.status,
          msg: ''
        }

        if (err.status === 409){
            errMsg['msg'] = '해당 정보가 이미 존재'
            resolve('')
        } else {
            errMsg['msg'] = err
        }
        console.log(err)
        reject(errMsg)
      }

      resolve(result)
    })
  })
}

function elasticsearchAllSearch(){
  let keyword = '블로그'

  return new Promise((resolve, reject) => {
    elasticsearch_client.search({
      index: 'korean',
      type: 'text',
      query: {
        match_all: {}
      },
      from : 10, size : 20,
      // q: keyword
    }, (err, result) => {
      if (err) reject (err)

      resolve(result)
    })
  })
}

async function start(){
  console.log('test')
  let dataset = await elasticsearchAllSearch();
  //

  dataset.hits.hits.forEach(item => {
    console.log(item._source)
  })
  // console.log(dataset.hits)
  // console.log(dataset.hits.total)

  let a = await elasticsearch_save({id: 'test5', text: 'text', link: 'link1'})
  // console.log(a)
}

start()
