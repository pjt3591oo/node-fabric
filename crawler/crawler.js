var cheerio = require('cheerio');
var request = require('request');
// var  { invoke } = require('./invoke');
var elasticsearch_client = require('./elasticsearchData');
var sha256 = require('sha256')
var { parse } = require('./parse')

var HEADERS = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) ppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
   'Content-Type' : 'application/x-www-form-urlencoded'
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getDom(url){
    return new Promise(function(resolve, reject) {
        request({
            uri: url,
            headers: HEADERS
        }, function(error, response, html){
            if (error) { reject(error) }
            let $ = cheerio.load(html);
            resolve($)
        })
    })
}

async function craw(range){
  let peerIndex = 10;

  for(let i = 1 ; i< range +1 ; ++i){
    let url = `https://search.naver.com/search.naver?where=post&sm=tab_jum&query=바람의나라&start=${i}`;
    console.log(`========= ${url} ========= `)

    let $ = await getDom(url)
    let searchs = $('.sh_blog_title')

    // blog list
    for(let j = 0 ; j <  searchs.length ; ++j){

      let link = searchs.eq(j)['0'].attribs.href
      let linktemp = {
        id: sha256(link),
        text: '',
        link: link
      };

      // blog page
      let $ = await getDom(link)
      linktemp['text'] = $.text().trim()
      // let parsedText = await parse(linktemp['text'])
      // await invoke(linktemp);
      try {
        await elasticsearch_save({id: linktemp['id'], text: linktemp['text'], link: linktemp['link']})
      } catch (err) {
        console.log(err)
      }
      // console.log(parsedText)
      console.log(linktemp)
      sleep(300)
    }

  }
}

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
        reject(errMsg)
      }

      resolve(result)
    })
  })
}

function elasticsearchAllSearch(){
  return new Promise((resolve, reject) => {
    elasticsearch_client.search({
      index: 'korean',
      type: 'text',
    }, (err, result) => {
      if (err) reject (err)

      resolve(result)
    })
  })
}

function elasticsearchKeywordSearch(keyword){
  return new Promise((resolve, reject) => {
    elasticsearch_client.search({
      index: 'korean',
      type: 'text',
      // source: [keyword],
      // query: {
      //   bool: {
      //     must: [
      //       {
      //         match: {
      //           text: keyword
      //         }
      //       }
      //     ]
      //   }
      // }
      q: keyword
    }, (err, result) => {
      if (err) reject (err)

      resolve(result)
    })
  })
}

async function start(){

  await craw(1)

  // let now = Date.now().toString()
  // let str = `안녕하세요. 좋은 아침입니다. ${now}`
  // let saved = await elasticsearch_save({id: now, text: str, link: 'http://www.naver.com'})
  // console.log(saved)

  // let data = await elasticsearchAllSearch()
  // try{
  //
  //   let data = await elasticsearchKeywordSearch('와우랑')
  //   console.log(data.hits.hits)
  // } catch (err) {
  //   console.log(err)
  // }

  // console.log('end')
}

start()
