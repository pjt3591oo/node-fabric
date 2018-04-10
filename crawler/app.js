var cheerio = require('cheerio');
var request = require('request');
var  { invoke } = require('./invoke');

HEADERS = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) ppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
   'Content-Type' : 'application/x-www-form-urlencoded'
};

function getDom(url){
    return new Promise(function(resolve, reject) {
        request({
            uri: url,
            headers: HEADERS
        }, function(error, response, html){
            if (error) { reject(error) }

            let $ = cheerio.load(html);
            resolve(cheerio.load(html))
        })
    })
}

async function craw(range){
    let peerIndex = 10;

    for(let i = 1 ; i< range +1 ; ++i){
      let url = `https://search.naver.com/search.naver?where=post&sm=tab_jum&query=test&start=${i}`;
      console.log(`========= ${url} ========= `)

      let $ = await getDom(url)
      let searchs = $('.sh_blog_title');

      for(let j = 0 ; j <  searchs .length ; ++j){
        let temp = {
          id: `CAR${ peerIndex * (i - 1) + j }`,
          title: searchs .eq(j).text()
        };
        await invoke(temp);
        console.log(temp);
      }
    }
}

async function a (){

  await craw(50)
  console.log('end')
}

a()

// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting

